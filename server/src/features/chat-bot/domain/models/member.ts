import { LeftChatMemberEvent } from '@features/chat-bot/application/events/left-chat-member.event';
import { MemberSentMessageEvent } from '@features/chat-bot/application/events/member-sent-message.event';
import { MemberSentPrivateMessageEvent } from '@features/chat-bot/application/events/member-sent-private-message.event';
import { NewChatMemberEvent } from '@features/chat-bot/application/events/new-chat-member.event';
import { Message } from '@features/chat-bot/domain/models/message';
import { AggregateRoot } from '@nestjs/cqrs';
import { Chat } from './../models/chat';

export class Member extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly username: string,
    public readonly country: string,
    public readonly isBot: boolean,
  ) {
    super();
    this.autoCommit = true;
  }

  join(chat: Chat, date: number) {
    this.apply(new NewChatMemberEvent(this, chat, date));
  }

  left(chat: Chat) {
    this.apply(new LeftChatMemberEvent(this.id, chat));
  }

  sendPrivate(message: Message, chat: Chat) {
    this.apply(new MemberSentPrivateMessageEvent(this, message, chat));
  }

  send(message: Message, chat: Chat) {
    this.apply(new MemberSentMessageEvent(this, message, chat));
  }
}
