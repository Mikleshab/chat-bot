import { Chat } from '@features/chat-bot/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';
import { IEvent } from '@nestjs/cqrs';

export class NewChatMemberEvent implements IEvent {
  constructor(
    public readonly member: Member,
    public readonly chat: Chat,
    public readonly date: number,
  ) {}
}
