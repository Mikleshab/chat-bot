import { IEvent } from '@nestjs/cqrs';
import { Chat } from '@features/chat-bot/domain/models/chat';

export class MemberPrivateMessageSavedEvent implements IEvent {
  constructor(public readonly chat: Chat) {}
}
