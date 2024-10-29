import { AnalyticsRepository } from '@features/analytics/application/repositories/analytics.repository';
import { Data } from '@features/analytics/domain/value-objects/data';
import { DataMapper } from '@features/analytics/infrastructure/firebase/mappers/data.mapper';
import { Chat } from '@features/chat/domain/models/chat';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import * as admin from 'firebase-admin';
import { DateTime } from 'luxon';
import {
  CHAT_MEMBERS_COLLECTION,
  CHAT_MESSAGES_COLLECTION,
  CHATS_COLLECTION,
  COUNTERS_COLLECTION,
} from 'src/common/constants/collections';

export class FirebaseAnalyticsRepository implements AnalyticsRepository {
  constructor(private readonly firebase: FirebaseService) {}

  async getMessagesCount(chatId: Chat['id']): Promise<number> {
    return this.getCountFromCollection(chatId, CHAT_MESSAGES_COLLECTION);
  }

  async getMembersCount(chatId: Chat['id']): Promise<number> {
    return this.getCountFromCollection(chatId, CHAT_MEMBERS_COLLECTION);
  }

  async getMessageHistory(chatId: Chat['id']): Promise<Data[]> {
    return this.getHistoryFromCollection(chatId, CHAT_MESSAGES_COLLECTION);
  }

  async getMembersHistory(chatId: Chat['id']): Promise<Data[]> {
    return this.getHistoryFromCollection(chatId, CHAT_MEMBERS_COLLECTION);
  }

  private async getCountFromCollection(chatId: Chat['id'], collectionKey: string): Promise<number> {
    const db = this.firebase.app.firestore();
    const docRef = db.collection(COUNTERS_COLLECTION).doc(chatId.toString());
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error(`${COUNTERS_COLLECTION}/${chatId} not found.`);
    }

    const data = doc.data();

    if (!data || data[collectionKey] === undefined) {
      throw new Error(`Data in path ${COUNTERS_COLLECTION}/${chatId}/${collectionKey} not found.`);
    }

    return data[collectionKey].count as number;
  }

  async getHistoryFromCollection(chatId: Chat['id'], collectionName: string): Promise<Data[]> {
    const db = this.firebase.app.firestore();
    const collectionRef = db.collection(CHATS_COLLECTION).doc(chatId.toString()).collection(collectionName);

    const sevenWeeksAgo = DateTime.now().minus({ weeks: 7 }).toJSDate();

    const querySnapshot = await collectionRef
      .where('date', '>=', admin.firestore.Timestamp.fromDate(sevenWeeksAgo))
      .orderBy('date', 'desc')
      .get();

    if (querySnapshot.empty) {
      return [];
    }

    const docs = querySnapshot.docs;

    return docs.map((doc) => DataMapper.toDomain(doc.data()));
  }
}
