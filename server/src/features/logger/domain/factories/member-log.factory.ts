import { LogNewMemberCommand } from '@features/logger/application/commands/log-new-member.command';
import { MemberLog } from '@features/logger/domain/value-objects/member-log';

export class MemberLogFactory {
  static create(command: LogNewMemberCommand): MemberLog {
    return new MemberLog(
      command.userId,
      command.firstName,
      command.lastName,
      command.username,
      command.country,
      command.chatId,
      command.isBot,
    );
  }
}
