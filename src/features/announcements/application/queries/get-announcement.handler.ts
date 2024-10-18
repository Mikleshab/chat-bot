import { AnnouncementsRepository } from '@features/announcements/application/repositories/announcements.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAnnouncementQuery } from './get-announcement.query';

@QueryHandler(GetAnnouncementQuery)
export class GetAnnouncementHandler implements IQueryHandler<GetAnnouncementQuery> {
  constructor(private readonly repository: AnnouncementsRepository) {}

  async execute(query: GetAnnouncementQuery): Promise<any> {
    const { id, chatId } = query;

    return this.repository.getOneById(id, chatId);
  }
}
