import { AggregateRoot } from '@nestjs/cqrs';
import { MemberPrivateMessageSavedEvent } from '@features/consultant/application/events/member-private-message-saved.event';
import { Chat } from '@features/chat/domain/models/chat';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { MessageUpdatedEvent } from '@features/consultant/application/events/message-updated.event';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';
import { ConversationUpdatedEvent } from '@features/consultant/application/events/conversation-updated.event';

export class UserDomain extends AggregateRoot {
  constructor(
    public readonly userId: number,
    public readonly username: string,
    public readonly fullName: string,
    public readonly country: string,
  ) {
    super();
    this.autoCommit = true;
  }

  askQuestion(chat: Chat) {
    this.apply(new MemberPrivateMessageSavedEvent(chat));

    return this;
  }

  replyTo(conversationMessageId: ConversationMessage['telegramMessageId']) {
    this.apply(new MessageUpdatedEvent(conversationMessageId));

    return this;
  }

  update(conversation: Conversation) {
    this.apply(new ConversationUpdatedEvent(conversation));
  }
}
