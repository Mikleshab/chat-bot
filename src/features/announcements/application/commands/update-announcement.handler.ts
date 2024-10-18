import { AnnouncementsRepository } from '@features/announcements/application/repositories/announcements.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAnnouncementCommand } from './update-announcement.command';

@CommandHandler(UpdateAnnouncementCommand)
export class UpdateAnnouncementHandler implements ICommandHandler<UpdateAnnouncementCommand> {
  constructor(private readonly repository: AnnouncementsRepository) {}

  async execute(command: UpdateAnnouncementCommand): Promise<void> {
    const { id, chatId, title, text } = command;

    await this.repository.update(id, chatId, { title, text });
  }
}
