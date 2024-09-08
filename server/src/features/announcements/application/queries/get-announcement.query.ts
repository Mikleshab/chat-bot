import { IQuery } from '@nestjs/cqrs';
import { Announcement } from '../../domain/model/announcement';

export class GetAnnouncementQuery implements IQuery {
  constructor(public readonly id: Announcement['id']) {}
}
