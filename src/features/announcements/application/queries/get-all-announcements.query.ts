import { IQuery } from '@nestjs/cqrs';
import { Announcement } from '@features/announcements/domain/model/announcement';

export class GetAllAnnouncementsQuery implements IQuery {
  constructor(public readonly chatId: Announcement['chatId']) {}
}
