import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChatEventRepository } from '../repositories/chat-event.repository';
import { ChatEvent } from '../../domain/model/chat-event';
import { GetChatEventByAnnouncementIdQuery } from './get-chat-event-by-announcement-id.query';

@QueryHandler(GetChatEventByAnnouncementIdQuery)
export class GetChatEventByAnnouncementIdHandler implements IQueryHandler<GetChatEventByAnnouncementIdQuery> {
  constructor(private readonly repository: ChatEventRepository) {}

  async execute(query: GetChatEventByAnnouncementIdQuery): Promise<ChatEvent> {
    const { announcementId } = query;

    return this.repository.getOneByAnnouncementId(announcementId);
  }
}
