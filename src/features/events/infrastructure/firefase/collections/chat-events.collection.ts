import { Chat } from '@features/chat/domain/models/chat';
import { ChatEventRepository } from '@features/events/application/repositories/chat-event.repository';
import { ChatEvent } from '@features/events/domain/model/chat-event';
import { ChatEventMapper } from '@features/events/infrastructure/firefase/mappers/chat-event.mapper';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { BadRequestException } from '@nestjs/common';
import { CHAT_EVENTS_COLLECTION, CHATS_COLLECTION } from 'src/common/constants/collections';

export class ChatEventsCollection implements ChatEventRepository {
  constructor(private readonly firebase: FirebaseService) {}

  async add(data: Pick<ChatEvent, 'chatId' | 'title' | 'eventOptions' | 'announcementId'>): Promise<void> {
    const db = this.firebase.app.firestore();
    const docRef = db.collection(CHATS_COLLECTION).doc(data.chatId.toString()).collection(CHAT_EVENTS_COLLECTION).doc();

    await docRef.set(ChatEventMapper.toDoc(data, docRef.id));
  }

  async getOneByType(filter: { chatId: Chat['id']; eventType: ChatEvent['eventOptions']['type'] }): Promise<ChatEvent> {
    const db = this.firebase.app.firestore();
    const collectionRef = db
      .collection(CHATS_COLLECTION)
      .doc(filter.chatId.toString())
      .collection(CHAT_EVENTS_COLLECTION);

    const query = collectionRef.where('eventOptions.type', '==', filter.eventType).limit(1);

    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      throw new BadRequestException(`Chat Event does not exist: ${JSON.stringify(filter)}`);
    }

    const [doc] = querySnapshot.docs;

    return ChatEventMapper.toDomain(doc.data());
  }

  async getOneByAnnouncementId(
    announcementId: ChatEvent['announcementId'],
    chatId: ChatEvent['chatId'],
  ): Promise<ChatEvent> {
    const db = this.firebase.app.firestore();
    const collectionRef = db.collection(CHATS_COLLECTION).doc(chatId.toString()).collection(CHAT_EVENTS_COLLECTION);

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
    const collectionRef = db.collection(CHATS_COLLECTION).doc(chatId.toString()).collection(CHAT_EVENTS_COLLECTION);

    const querySnapshot = await collectionRef.get();

    const docs = querySnapshot.docs;

    return docs.map((doc) => ChatEventMapper.toDomain(doc.data()));
  }

  async removeById(id: ChatEvent['id'], chatId: ChatEvent['chatId']): Promise<void> {
    const db = this.firebase.app.firestore();
    const docRef = db.collection(CHATS_COLLECTION).doc(chatId.toString()).collection(CHAT_EVENTS_COLLECTION).doc(id);

    await docRef.delete();
  }
}
