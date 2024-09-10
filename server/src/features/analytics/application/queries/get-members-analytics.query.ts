import { Chat } from '@features/chat-bot/domain/models/chat';
import { IQuery } from '@nestjs/cqrs';

export class GetMembersAnalyticsQuery implements IQuery {
  constructor(public readonly chatId: Chat['id']) {}
}
