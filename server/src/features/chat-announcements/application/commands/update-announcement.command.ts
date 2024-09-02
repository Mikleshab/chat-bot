import { ICommand } from '@nestjs/cqrs';
import { Announcement } from '../../domain/model/announcement';

export class UpdateAnnouncementCommand implements ICommand {
  constructor(
    public readonly id: Announcement['id'],
    public readonly title?: Announcement['title'],
    public readonly text?: Announcement['text'],
  ) {}
}
