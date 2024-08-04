import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StatisticsRepository } from '@features/group-statistics/application/statistics.repository';
import { NewGroupMemberCommand } from '@features/group-statistics/application/commands/new-group-member.command';
import { MemberDomain } from '@features/group-statistics/domain/member.domain';

@CommandHandler(NewGroupMemberCommand)
export class NewGroupMemberHandler implements ICommandHandler<NewGroupMemberCommand, void> {
  constructor(private readonly repository: StatisticsRepository) {}

  async execute(command: NewGroupMemberCommand) {
    await this.repository.saveMember(MemberDomain.create(command));
  }
}
