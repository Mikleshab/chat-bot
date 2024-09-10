import { MessageLog } from '@features/logger/domain/value-objects/message-log';
import * as admin from 'firebase-admin';

export class MessageMapper {
  static toDoc(messageLog: MessageLog) {
    return {
      id: messageLog.id,
      userId: messageLog.userId,
      text: messageLog.text,
      date: admin.firestore.Timestamp.fromMillis(messageLog.date),
      replyToMessageId: messageLog.replyToMessageId,
      chatId: messageLog.chatId,
    };
  }
}
