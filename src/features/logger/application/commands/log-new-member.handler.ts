import { LogNewMemberCommand } from '@features/logger/application/commands/log-new-member.command';
import { LoggerRepository } from '@features/logger/application/repositories/logger.repository';
import { MemberLogFactory } from '@features/logger/domain/factories/member-log.factory';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(LogNewMemberCommand)
export class NewGroupMemberHandler implements ICommandHandler<LogNewMemberCommand, void> {
  constructor(private readonly repository: LoggerRepository) {}

  async execute(command: LogNewMemberCommand) {
    const memberLog = MemberLogFactory.create(command);

    await this.repository.saveMember(memberLog);
  }
}
