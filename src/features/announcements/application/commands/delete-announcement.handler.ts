import { AnnouncementsRepository } from '@features/announcements/application/repositories/announcements.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAnnouncementCommand } from './delete-announcement.command';

@CommandHandler(DeleteAnnouncementCommand)
export class DeleteAnnouncementHandler implements ICommandHandler<DeleteAnnouncementCommand> {
  constructor(private readonly repository: AnnouncementsRepository) {}

  async execute(command: DeleteAnnouncementCommand): Promise<void> {
    const { id, chatId } = command;

    await this.repository.deleteById(id, chatId);
  }
}
