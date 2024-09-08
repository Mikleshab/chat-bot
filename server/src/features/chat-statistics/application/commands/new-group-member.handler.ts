import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StatisticsRepository } from '@features/chat-statistics/application/repositories/statistics.repository';
import { NewGroupMemberCommand } from '@features/chat-statistics/application/commands/new-group-member.command';
import { Member } from '@features/chat-statistics/domain/models/member';

@CommandHandler(NewGroupMemberCommand)
export class NewGroupMemberHandler implements ICommandHandler<NewGroupMemberCommand, void> {
  constructor(private readonly repository: StatisticsRepository) {}

  async execute(command: NewGroupMemberCommand) {
    await this.repository.saveMember(Member.create(command));
  }
}
