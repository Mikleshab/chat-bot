import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import * as admin from 'firebase-admin';
import { UserMapper } from '@features/consultant/infrastructure/firebase/mappers/user.mapper';

export class MessageMapper {
  static toDocData(message: ConversationMessage) {
    return {
      telegramMessageId: message.telegramMessageId,
      author: UserMapper.toDocData(message.author),
      timestamp: admin.firestore.Timestamp.fromMillis(message.timestamp),
      content: message.content,
      replyToMessageId: message.replyToMessageId,
    };
  }

  static toDomain(doc: any) {
    return new ConversationMessage(
      doc.telegramMessageId,
      UserMapper.toDomain(doc.author),
      doc.timestamp.toMillis(),
      doc.content,
      doc.replyToMessageId,
    );
  }
}
