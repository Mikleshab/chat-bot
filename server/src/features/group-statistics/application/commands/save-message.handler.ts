import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StatisticsRepository } from '@features/group-statistics/application/statistics.repository';
import { SaveMessageCommand } from '@features/group-statistics/application/commands/save-message.command';
import { MessageDomain } from '@features/group-statistics/domain/message.domain';

@CommandHandler(SaveMessageCommand)
export class SaveMessageHandler implements ICommandHandler<SaveMessageCommand, void> {
  constructor(private readonly repository: StatisticsRepository) {}

  async execute(command: SaveMessageCommand) {
    await this.repository.saveMessage(MessageDomain.create(command));
  }
}
