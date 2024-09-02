import { IEvent } from '@nestjs/cqrs';
import { Member } from '@features/chat-bot/domain/models/member';
import { Chat } from '@features/chat-bot/domain/models/chat';

export class NewChatMemberEvent implements IEvent {
  constructor(
    public readonly member: Member,
    public readonly chat: Chat,
  ) {}
}
