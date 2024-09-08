import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AnnouncementsRepository } from '../repositories/announcements.repository';
import { UpdateAnnouncementCommand } from './update-announcement.command';

@CommandHandler(UpdateAnnouncementCommand)
export class UpdateAnnouncementHandler implements ICommandHandler<UpdateAnnouncementCommand> {
  constructor(private readonly repository: AnnouncementsRepository) {}

  async execute(command: UpdateAnnouncementCommand): Promise<void> {
    const { id, title, text } = command;

    await this.repository.update(id, { title, text });
  }
}
