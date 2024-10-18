import { LogLeftMemberCommand } from '@features/logger/application/commands/log-left-member.command';
import { LoggerRepository } from '@features/logger/application/repositories/logger.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(LogLeftMemberCommand)
export class LogLeftMemberHandler implements ICommandHandler<LogLeftMemberCommand, void> {
  constructor(private readonly repository: LoggerRepository) {}

  async execute(command: LogLeftMemberCommand) {
    await this.repository.deleteMember(command.chatId, command.userId);
  }
}
