import { Chat } from '@features/chat/domain/models/chat';
import { IQuery } from '@nestjs/cqrs';

export class GetMessagesAnalyticsQuery implements IQuery {
  constructor(public readonly chatId: Chat['id']) {}
}
