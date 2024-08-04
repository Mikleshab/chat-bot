import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StatisticsRepository } from '@features/group-statistics/application/statistics.repository';
import { LeftGroupMemberCommand } from '@features/group-statistics/application/commands/left-group-member.command';

@CommandHandler(LeftGroupMemberCommand)
export class LeftGroupMemberHandler implements ICommandHandler<LeftGroupMemberCommand, void> {
  constructor(private readonly repository: StatisticsRepository) {}

  async execute(command: LeftGroupMemberCommand) {
    await this.repository.deleteMember(command.userId);
  }
}
