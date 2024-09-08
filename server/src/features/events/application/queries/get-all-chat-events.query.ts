import { IQuery } from '@nestjs/cqrs';
import { Chat } from '@features/chat-bot/domain/models/chat';

export class GetAllChatEventsQuery implements IQuery {
  constructor(public readonly chatId: Chat['id']) {}
}