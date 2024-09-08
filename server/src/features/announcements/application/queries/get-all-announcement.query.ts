import { IQuery } from '@nestjs/cqrs';
import { Announcement } from '../../domain/model/announcement';

export class GetAllAnnouncementQuery implements IQuery {
  constructor(public readonly chatId: Announcement['chatId']) {}
}
