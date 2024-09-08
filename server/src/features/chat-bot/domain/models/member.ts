import { AggregateRoot } from '@nestjs/cqrs';
import { NewChatMemberEvent } from '@features/chat-bot/application/events/new-chat-member.event';
import { LeftChatMemberEvent } from '@features/chat-bot/application/events/left-chat-member.event';
import { MemberSentPrivateMessageEvent } from '@features/chat-bot/application/events/member-sent-private-message.event';
import { Chat } from './../models/chat';
import { Message } from '@features/chat-bot/domain/models/message';

export class Member extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly username: string,
    public readonly country: string,
  ) {
    super();
    this.autoCommit = true;
  }

  join(chat: Chat) {
    this.apply(new NewChatMemberEvent(this, chat));
  }

  left(chat: Chat) {
    this.apply(new LeftChatMemberEvent(this.id, chat));
  }

  sendPrivate(message: Message, chat: Chat) {
    this.apply(new MemberSentPrivateMessageEvent(this, message, chat));
  }
}
