import { Announcement } from '@features/announcements/domain/model/announcement';
import { ICommand } from '@nestjs/cqrs';

export class DeleteAnnouncementCommand implements ICommand {
  constructor(
    public readonly id: Announcement['id'],
    public readonly chatId: Announcement['chatId'],
  ) {}
}
