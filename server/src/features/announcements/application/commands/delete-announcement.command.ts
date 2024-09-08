import { ICommand } from '@nestjs/cqrs';
import { Announcement } from '@features/announcements/domain/model/announcement';

export class DeleteAnnouncementCommand implements ICommand {
  constructor(public readonly id: Announcement['id']) {}
}
