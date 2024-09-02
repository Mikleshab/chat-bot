import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAnnouncementCommand } from './create-announcement.command';
import { AnnouncementsRepository } from '../repositories/announcements.repository';

@CommandHandler(CreateAnnouncementCommand)
export class CreateAnnouncementHandler implements ICommandHandler<CreateAnnouncementCommand> {
  constructor(private readonly repository: AnnouncementsRepository) {}

  async execute(command: CreateAnnouncementCommand): Promise<void> {
    const { title, text, chatId } = command;

    await this.repository.create({ title, text, chatId });
  }
}
