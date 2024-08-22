import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { MessageRepository } from '@features/bot-consultant/application/message.repository';
import { ConversationRepository } from '@features/bot-consultant/application/conversation.repository';
import { Injectable } from '@nestjs/common';
import { Conversation } from '@features/bot-consultant/domain/value-objects/conversation';
import { ConversationFactory } from '@features/bot-consultant/domain/factories/conversation.factory';
import { EventBus } from '@nestjs/cqrs';
import { ConversationUpdatedEvent } from '@features/bot-consultant/domain/events/conversation-updated.event';
import { MessageUpdatedEvent } from '@features/bot-consultant/domain/events/message-updated.event';

@Injectable()
export class ConsultantService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly conversationRepository: ConversationRepository,
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

    this.eventBus.publish(new MessageUpdatedEvent(message.parentId!));
    this.eventBus.publish(new ConversationUpdatedEvent(conversation));
  }

  async saveConsultantMessage(reply: MessageDomain, clientId: Conversation['client']['userId']) {
    const [existingConversation] = await this.conversationRepository.getConversations({
      clientIds: [clientId],
    });

    existingConversation.updateLastActivity(reply.timestamp).updateMessagesCount();

    await this.messageRepository.saveMessage(existingConversation, reply);

    this.eventBus.publish(new MessageUpdatedEvent(reply.parentId!));
    this.eventBus.publish(new ConversationUpdatedEvent(existingConversation));
  }

  getQuestions(authorId: Conversation['client']['userId']): Promise<MessageDomain[]> {
    return this.messageRepository.getMessages({ authorId, parentId: null }, {});
  }

  getReplies(
    parentId: MessageDomain['parentId'],
    pageInfo: { after?: string; first?: number },
  ): Promise<MessageDomain[]> {
    return this.messageRepository.getMessages({ parentId }, pageInfo);
  }

  async getConversations(filter?: { clientIds: Conversation['client']['userId'][] }): Promise<Conversation[]> {
    return this.conversationRepository.getConversations(filter);
  }

  async getRepliesWithPagination(parentId: string, pageInfo: { after?: string; first?: number }) {
    const first = pageInfo.first || 10;

    const replies = await this.getReplies(parentId, { after: pageInfo.after, first });

    const hasNextPage = replies.length === first;
    const startCursor = replies.length > 0 ? replies[0].timestamp.toString() : null;
    const endCursor = replies.length > 0 ? replies[replies.length - 1].timestamp.toString() : null;

    return { replies, hasNextPage, startCursor, endCursor };
  }
}
