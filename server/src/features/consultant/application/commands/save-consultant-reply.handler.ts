import { CommandBus, CommandHandler, EventPublisher, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { MessageRepository } from '@features/consultant/application/ports/message.repository';
import { SaveConsultantReplyCommand } from '@features/consultant/application/commands/save-consultant-reply.command';
import { UserFactory } from '@features/consultant/domain/factories/user.factory';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { ConversationMessageFactory } from '@features/consultant/domain/factories/conversation-message.factory';
import { GetAllConversations } from '@features/consultant/application/queries/get-all-conversations.query';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';
import { SendMessageToMemberCommand } from '@features/chat-bot/application/commands/send-message-to-member.command';
import { Message } from '@features/chat-bot/domain/models/message';

@CommandHandler(SaveConsultantReplyCommand)
export class SaveConsultantReplyHandler implements ICommandHandler<SaveConsultantReplyCommand, void> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: MessageRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: SaveConsultantReplyCommand) {
    const { replyToMessageId, clientId, text } = command;

    const consultant = this.publisher.mergeObjectContext(UserFactory.createConsultant());

    let conversationMessage: ConversationMessage;

    const parent = await this.repository.getMessageById(replyToMessageId);
    if (parent.author.username !== consultant.username) {
      const message = await this.commandBus.execute<SendMessageToMemberCommand, Message>(
        new SendMessageToMemberCommand(clientId, text, replyToMessageId),
      );

      conversationMessage = ConversationMessageFactory.createConsultantReplyToClientMessage(message, consultant);
    } else {
      conversationMessage = ConversationMessageFactory.createConsultantReplyToConsultantReply(
        text,
        replyToMessageId,
        consultant,
      );
    }

    const [existingConversation] = await this.queryBus.execute<GetAllConversations, Conversation[]>(
      new GetAllConversations({ clientIds: [clientId] }),
    );

    existingConversation.updateLastActivity(conversationMessage.timestamp).updateMessagesCount();

    await this.repository.saveMessage(existingConversation, conversationMessage);

    consultant.replyTo(replyToMessageId).update(existingConversation);
  }
}
