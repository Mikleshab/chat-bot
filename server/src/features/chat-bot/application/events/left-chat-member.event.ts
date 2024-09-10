import { Chat } from '@features/chat-bot/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';
import { IEvent } from '@nestjs/cqrs';

export class LeftChatMemberEvent implements IEvent {
  constructor(
    public readonly memberId: Member['id'],
    public readonly chat: Chat,
  ) {}
}
