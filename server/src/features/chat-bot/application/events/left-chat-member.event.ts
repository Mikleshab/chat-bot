import { IEvent } from '@nestjs/cqrs';
import { Member } from '@features/chat-bot/domain/models/member';
import { Chat } from '@features/chat-bot/domain/models/chat';

export class LeftChatMemberEvent implements IEvent {
  constructor(
    public readonly memberId: Member['id'],
    public readonly chat: Chat,
  ) {}
}
