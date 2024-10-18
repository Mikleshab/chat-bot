import { ICommand } from '@nestjs/cqrs';
import { Announcement } from '@features/announcements/domain/model/announcement';

export class UpdateAnnouncementCommand implements ICommand {
  constructor(
    public readonly id: Announcement['id'],
    public readonly chatId: Announcement['chatId'],
    public readonly title?: Announcement['title'],
    public readonly text?: Announcement['text'],
  ) {}
}
