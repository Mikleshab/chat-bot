import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import * as admin from 'firebase-admin';
import { UserMapper } from '@features/bot-consultant/infrastructure/firebase/mappers/user.mapper';
import { MessageFactory } from '@features/bot-consultant/domain/factories/message.factory';

export class MessageMapper {
  static toDocData(message: MessageDomain) {
    return {
      telegramMessageId: message.telegramMessageId,
      author: UserMapper.toDocData(message.author),
      timestamp: admin.firestore.Timestamp.fromMillis(message.timestamp),
      content: message.content,
      replyToMessageId: message.replyToMessageId,
    };
  }

  static toDomain(doc: any) {
    return MessageFactory.load({ ...doc, timestamp: doc.timestamp.toMillis() });
  }
}
