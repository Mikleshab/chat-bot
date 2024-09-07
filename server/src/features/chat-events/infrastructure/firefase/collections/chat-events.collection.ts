import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { ChatEventMapper } from '../mappers/chat-event.mapper';
import { ChatEventRepository } from '../../../application/repositories/chat-event.repository';
import { Chat } from '@features/chat-bot/domain/models/chat';
import { ChatEvent } from '../../../domain/model/chat-event';
import { BadRequestException } from '@nestjs/common';

export class ChatEventsCollection implements ChatEventRepository {
  private readonly collectionName = 'chat-events';

  constructor(private readonly firebase: FirebaseService) {}

  async add(data: Omit<ChatEvent, 'id'>): Promise<void> {
    const db = this.firebase.app.firestore();

    const docRef = db.collection(this.collectionName).doc();

    await docRef.set({ ...data, id: docRef.id });
  }

  async getOneByType(filter: { chatId: Chat['id']; eventType: ChatEvent['eventOptions']['type'] }): Promise<ChatEvent> {
    const db = this.firebase.app.firestore();
    const collectionRef = db.collection(this.collectionName);

    const query = collectionRef
      .where('chatId', '==', filter.chatId)
      .where('eventType.type', '==', filter.eventType)
      .limit(1);

    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      throw new BadRequestException(`Chat Event does not exist: ${JSON.stringify(filter)}`);
    }

    const [doc] = querySnapshot.docs;

    return ChatEventMapper.toDomain(doc.data());
  }

  async getOneByAnnouncementId(announcementId: ChatEvent['announcementId']): Promise<ChatEvent> {
    const db = this.firebase.app.firestore();
    const collectionRef = db.collection(this.collectionName);

    const query = collectionRef.where('announcementId', '==', announcementId).limit(1);

    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      throw new BadRequestException(`Chat Event does not exist: ${JSON.stringify(announcementId)}`);
    }

    const [doc] = querySnapshot.docs;

    return ChatEventMapper.toDomain(doc.data());
  }

  async getAllByChatId(chatId: ChatEvent['chatId']): Promise<ChatEvent[]> {
    const db = this.firebase.app.firestore();
    const collectionRef = db.collection(this.collectionName);

    const query = collectionRef.where('chatId', '==', chatId);

    const querySnapshot = await query.get();

    const docs = querySnapshot.docs;

    return docs.map((doc) => ChatEventMapper.toDomain(doc.data()));
  }

  async removeById(id: ChatEvent['id']): Promise<void> {
    const db = this.firebase.app.firestore();
    const docRef = db.collection(this.collectionName).doc(id);

    await docRef.delete();
  }
}
