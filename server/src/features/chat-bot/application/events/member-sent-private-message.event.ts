import { IEvent } from '@nestjs/cqrs';
import { Member } from '../../domain/models/member';
import { Message } from '../../domain/models/message';
import { Chat } from '@features/chat-bot/domain/models/chat';

export class MemberSentPrivateMessageEvent implements IEvent {
  constructor(
    public readonly member: Member,
    public readonly message: Message,
    public readonly chat: Chat,
  ) {}
}
