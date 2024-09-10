import { MemberLog } from '@features/logger/domain/value-objects/member-log';
import * as admin from 'firebase-admin';

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
      date: admin.firestore.Timestamp.fromMillis(memberLog.date),
    };
  }
}
