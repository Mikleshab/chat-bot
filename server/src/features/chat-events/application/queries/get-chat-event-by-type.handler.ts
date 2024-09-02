import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetChatEventByTypeQuery } from './get-chat-event-by-type.query';
import { ChatEventRepository } from '../repositories/chat-event.repository';
import { ChatEvent } from '../../domain/model/chat-event';

@QueryHandler(GetChatEventByTypeQuery)
export class GetChatEventByTypeHandler implements IQueryHandler<GetChatEventByTypeQuery> {
  constructor(private readonly repository: ChatEventRepository) {}

  async execute(query: GetChatEventByTypeQuery): Promise<ChatEvent> {
    const { chatId, eventType } = query;

    return this.repository.getOneByType({ chatId, eventType });
  }
}
