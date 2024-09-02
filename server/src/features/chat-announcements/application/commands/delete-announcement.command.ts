import { ICommand } from '@nestjs/cqrs';
import { Announcement } from '../../domain/model/announcement';

export class DeleteAnnouncementCommand implements ICommand {
  constructor(public readonly id: Announcement['id']) {}
}
