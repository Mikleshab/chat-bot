import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAnnouncementQuery } from './get-announcement.query';
import { AnnouncementsRepository } from '@features/announcements/application/repositories/announcements.repository';

@QueryHandler(GetAnnouncementQuery)
export class GetAnnouncementHandler implements IQueryHandler<GetAnnouncementQuery> {
  constructor(private readonly repository: AnnouncementsRepository) {}

  async execute(query: GetAnnouncementQuery): Promise<any> {
    const { id } = query;

    return this.repository.getOneById(id);
  }
}
