import { LogMemberMessageCommand } from '@features/logger/application/commands/log-member-message.command';
import { LoggerRepository } from '@features/logger/application/repositories/logger.repository';
import { MessageLogFactory } from '@features/logger/domain/factories/message-log.factory';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(LogMemberMessageCommand)
export class LogMemberMessageHandler implements ICommandHandler<LogMemberMessageCommand, void> {
  constructor(private readonly repository: LoggerRepository) {}

  async execute(command: LogMemberMessageCommand) {
    const messageLog = MessageLogFactory.create(command);

    await this.repository.saveMessage(messageLog);
  }
}
