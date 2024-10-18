import { ChatEvent } from '@features/events/domain/model/chat-event';
import * as admin from 'firebase-admin';

export class ChatEventMapper {
  static toDoc(data: Pick<ChatEvent, 'chatId' | 'title' | 'eventOptions' | 'announcementId'>, id: string) {
    return {
      id,
      chatId: data.chatId,
      title: data.title,
      eventOptions: data.eventOptions,
      announcementId: data.announcementId,
    };
  }

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
