import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { MessageRepository } from '@features/bot-consultant/application/ports/message.repository';
import { ConversationRepository } from '@features/bot-consultant/application/ports/conversation.repository';
import { Injectable } from '@nestjs/common';
import { Conversation } from '@features/bot-consultant/domain/value-objects/conversation';
import { ConversationFactory } from '@features/bot-consultant/domain/factories/conversation.factory';
import { EventBus } from '@nestjs/cqrs';
import { ConversationUpdatedEvent } from '@features/bot-consultant/domain/events/conversation-updated.event';
import { MessageUpdatedEvent } from '@features/bot-consultant/domain/events/message-updated.event';
import { UserFactory } from '@features/bot-consultant/domain/factories/user.factory';
import { Notification } from '@features/bot-consultant/domain/value-objects/notification';
import { MessageFactory } from '@features/bot-consultant/domain/factories/message.factory';
import { ConsultantMessageCreatedCommand } from '@features/bot-consultant/application/commands/consultant-message-created.command';
import { TelegramRepository } from '@features/bot-consultant/application/ports/telegram.repository';

@Injectable()
export class ConsultantService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly conversationRepository: ConversationRepository,
    private readonly telegramRepository: TelegramRepository,
    private readonly eventBus: EventBus,
  ) {}

  async saveClientMessage(message: MessageDomain) {
    let conversation: Conversation;

    const [existingConversation] = await this.conversationRepository.getConversations({
      clientIds: [message.author.userId],
    });
    if (existingConversation) {
      conversation = existingConversation;
    } else {
      conversation = ConversationFactory.create(message);
    }

    conversation.updateLastActivity(message.timestamp).updateMessagesCount();

    await this.messageRepository.saveMessage(conversation, message);

    if (message.replyToMessageId) {
      this.eventBus.publish(new MessageUpdatedEvent(message.replyToMessageId));
    }
    this.eventBus.publish(new ConversationUpdatedEvent(conversation));
  }

  getQuestions(authorId: Conversation['client']['userId']): Promise<MessageDomain[]> {
    return this.messageRepository.getMessages({ authorId, replyToMessageId: null }, {});
  }

  getReplies(
    replyToMessageId: MessageDomain['replyToMessageId'],
    pageInfo: { after?: string; first?: number },
  ): Promise<MessageDomain[]> {
    return this.messageRepository.getMessages({ replyToMessageId }, pageInfo);
  }

  async getConversations(filter?: { clientIds: Conversation['client']['userId'][] }): Promise<Conversation[]> {
    return this.conversationRepository.getConversations(filter);
  }

  async getRepliesWithPagination(
    replyToMessageId: MessageDomain['replyToMessageId'],
    pageInfo: {
      after?: string;
      first?: number;
    },
  ) {
    const first = pageInfo.first || 10;

    const replies = await this.getReplies(replyToMessageId, { after: pageInfo.after, first });

    const hasNextPage = replies.length === first;
    const startCursor = replies.length > 0 ? replies[0].timestamp.toString() : null;
    const endCursor = replies.length > 0 ? replies[replies.length - 1].timestamp.toString() : null;

    return { replies, hasNextPage, startCursor, endCursor };
  }

  async createConsultantMessage(command: ConsultantMessageCreatedCommand): Promise<void> {
    const consultant = UserFactory.createConsultant();

    const isReply = !!command.replyToMessageId;

    let message: MessageDomain;
    const notification = Notification.create(Notification, {
      text: command.text,
      replyToMessageId: command.replyToMessageId,
    });

    if (isReply) {
      const parent = await this.messageRepository.getMessageById(command.replyToMessageId);
      if (parent.author.username !== consultant.username) {
        message = await this.telegramRepository.sendMessage(
          consultant,
          notification,
          command.clientId,
          command.replyToMessageId,
        );
      } else {
        message = MessageFactory.createConsultantMessage(command.text, command.replyToMessageId, consultant);
      }
    } else {
      message = await this.telegramRepository.sendMessage(consultant, notification, command.clientId, null);
    }

    await this.saveConsultantMessage(message, command.clientId);
  }

  private async saveConsultantMessage(message: MessageDomain, clientId: Conversation['client']['userId']) {
    const [existingConversation] = await this.conversationRepository.getConversations({
      clientIds: [clientId],
    });

    existingConversation.updateLastActivity(message.timestamp).updateMessagesCount();

    await this.messageRepository.saveMessage(existingConversation, message);

    if (message.replyToMessageId) {
      this.eventBus.publish(new MessageUpdatedEvent(message.replyToMessageId!));
    }
    this.eventBus.publish(new ConversationUpdatedEvent(existingConversation));
  }
}
