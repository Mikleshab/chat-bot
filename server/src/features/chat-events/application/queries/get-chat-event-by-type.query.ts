import { IQuery } from '@nestjs/cqrs';
import { Chat } from '@features/chat-bot/domain/models/chat';
import { ChatEvent } from '@features/chat-events/domain/model/chat-event';

export class GetChatEventByTypeQuery implements IQuery {
  constructor(
    public readonly chatId: Chat['id'],
    public readonly eventType: ChatEvent['eventOptions']['type'],
  ) {}
}
