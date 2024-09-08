import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StatisticsRepository } from '@features/chat-statistics/application/repositories/statistics.repository';
import { SaveMessageCommand } from '@features/chat-statistics/application/commands/save-message.command';
import { Message } from '@features/chat-statistics/domain/models/message';

@CommandHandler(SaveMessageCommand)
export class SaveMessageHandler implements ICommandHandler<SaveMessageCommand, void> {
  constructor(private readonly repository: StatisticsRepository) {}

  async execute(command: SaveMessageCommand) {
    await this.repository.saveMessage(Message.create(command));
  }
}
