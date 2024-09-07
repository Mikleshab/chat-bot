import { ChatEvent } from '../../../domain/model/chat-event';
import * as admin from 'firebase-admin';

export class ChatEventMapper {
  static toDomain(doc: any): ChatEvent {
    const startDate: admin.firestore.Timestamp = doc.eventOptions.startDate;
    const endDate: admin.firestore.Timestamp = doc.eventOptions.endDate;

    return new ChatEvent(
      doc.id,
      doc.chatId,
      doc.title,
      {
        ...doc.eventOptions,
        startDate: startDate ? startDate.toDate() : null,
        endDate: endDate ? endDate.toDate() : null,
      },
      doc.announcementId,
    );
  }
}
