import { Chat } from '@features/chat/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';
import { Message } from '@features/chat-bot/domain/models/message';
import { IEvent } from '@nestjs/cqrs';

export class MemberSentMessageEvent implements IEvent {
  constructor(
    public readonly member: Member,
    public readonly message: Message,
    public readonly chat: Chat,
  ) {}
}
