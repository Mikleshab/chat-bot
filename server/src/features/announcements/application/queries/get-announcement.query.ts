import { Announcement } from '@features/announcements/domain/model/announcement';
import { IQuery } from '@nestjs/cqrs';

export class GetAnnouncementQuery implements IQuery {
  constructor(
    public readonly id: Announcement['id'],
    public readonly chatId: Announcement['chatId'],
  ) {}
}
