import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AnnouncementsRepository } from '../repositories/announcements.repository';
import { GetAllAnnouncementQuery } from '@features/announcements/application/queries/get-all-announcement.query';

@QueryHandler(GetAllAnnouncementQuery)
export class GetAllAnnouncementHandler implements IQueryHandler<GetAllAnnouncementQuery> {
  constructor(private readonly repository: AnnouncementsRepository) {}

  async execute(query: GetAllAnnouncementQuery): Promise<any> {
    const { chatId } = query;

    return this.repository.getAll(chatId);
  }
}
