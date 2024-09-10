import { MemberLog } from '@features/logger/domain/value-objects/member-log';

export class MemberMapper {
  static toDoc(memberLog: MemberLog) {
    return {
      id: memberLog.id,
      firstName: memberLog.firstName,
      lastName: memberLog.lastName,
      username: memberLog.username,
      country: memberLog.country,
      isBot: memberLog.isBot,
      chatId: memberLog.chatId,
    };
  }
}
