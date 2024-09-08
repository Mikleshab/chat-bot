import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChatEventRepository } from '@features/events/application/repositories/chat-event.repository';
import { ChatEvent } from '@features/events/domain/model/chat-event';
import { GetAllChatEventsQuery } from './get-all-chat-events.query';

@QueryHandler(GetAllChatEventsQuery)
export class GetAllChatEventsHandler implements IQueryHandler<GetAllChatEventsQuery> {
  constructor(private readonly repository: ChatEventRepository) {}

  async execute(query: GetAllChatEventsQuery): Promise<ChatEvent[]> {
    const { chatId } = query;

    return this.repository.getAllByChatId(chatId);
  }
}
