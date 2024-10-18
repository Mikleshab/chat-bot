import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AnnouncementsRepository } from '@features/announcements/application/repositories/announcements.repository';
import { GetAllAnnouncementsQuery } from '@features/announcements/application/queries/get-all-announcements.query';
import { Announcement } from '@features/announcements/domain/model/announcement';

@QueryHandler(GetAllAnnouncementsQuery)
export class GetAllAnnouncementsHandler implements IQueryHandler<GetAllAnnouncementsQuery> {
  constructor(private readonly repository: AnnouncementsRepository) {}

  async execute(query: GetAllAnnouncementsQuery): Promise<Announcement[]> {
    const { chatId } = query;

    return this.repository.getAll(chatId);
  }
}
