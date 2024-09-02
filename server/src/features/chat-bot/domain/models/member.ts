import { AggregateRoot } from '@nestjs/cqrs';
import { NewChatMemberEvent } from '@features/chat-bot/application/events/new-chat-member.event';
import { LeftChatMemberEvent } from '@features/chat-bot/application/events/left-chat-member.event';
import { Chat } from '@features/chat-bot/domain/models/chat';

export class Member extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly username: string,
    public readonly country: string,
  ) {
    super();
  }

  join(chat: Chat) {
    this.apply(new NewChatMemberEvent(this, chat));
  }

  left(chat: Chat) {
    this.apply(new LeftChatMemberEvent(this.id, chat));
  }
}
