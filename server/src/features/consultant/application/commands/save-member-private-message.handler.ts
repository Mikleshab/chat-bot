import { CommandHandler, EventPublisher, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { SaveMemberPrivateMessageCommand } from '@features/consultant/application/commands/save-member-private-message.command';
import { UserFactory } from '@features/consultant/domain/factories/user.factory';
import { ConversationMessageFactory } from '@features/consultant/domain/factories/conversation-message.factory';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';
import { GetAllConversations } from '@features/consultant/application/queries/get-all-conversations.query';
import { ConversationFactory } from '@features/consultant/domain/factories/conversation.factory';
import { MessageRepository } from '@features/consultant/application/ports/message.repository';

@CommandHandler(SaveMemberPrivateMessageCommand)
export class SaveMemberPrivateMessageHandler implements ICommandHandler<SaveMemberPrivateMessageCommand, void> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly repository: MessageRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: SaveMemberPrivateMessageCommand) {
    const { message, member, chat } = command;

    const client = this.publisher.mergeObjectContext(UserFactory.createClient(member));
    const conversationMessage = ConversationMessageFactory.createClientMessage(message, client);

    let conversation: Conversation;

    const [existingConversation] = await this.queryBus.execute<GetAllConversations, Conversation[]>(
      new GetAllConversations({ clientIds: [client.userId] }),
    );

    if (existingConversation) {
      conversation = existingConversation;
    } else {
      conversation = ConversationFactory.create(conversationMessage);
    }

    conversation.setLastActivity(conversationMessage.timestamp).updateMessagesCount();

    await this.repository.saveMessage(conversation, conversationMessage);

    if (conversationMessage.replyToMessageId) {
      client.replyTo(conversationMessage.replyToMessageId);
    }

    client.askQuestion(chat).update(conversation);
  }
}
