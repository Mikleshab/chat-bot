import { AnnouncementsRepository } from '@features/announcements/application/repositories/announcements.repository';
import { Announcement } from '@features/announcements/domain/model/announcement';
import { AnnouncementMapper } from '@features/announcements/infrastructure/firefase/mappers/announcemet.mapper';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { CHAT_ANNOUNCEMENTS_COLLECTION, CHATS_COLLECTION } from 'src/common/constants/collections';

export class AnnouncementsCollection implements AnnouncementsRepository {
  constructor(private readonly firebase: FirebaseService) {}

  async create(announcement: Omit<Announcement, 'id'>): Promise<void> {
    const db = this.firebase.app.firestore();
    const docRef = db
      .collection(CHATS_COLLECTION)
      .doc(announcement.chatId.toString())
      .collection(CHAT_ANNOUNCEMENTS_COLLECTION)
      .doc();

    await docRef.set(AnnouncementMapper.toDoc(announcement, docRef.id));
  }

  async getOneById(id: Announcement['id'], chatId: Announcement['chatId']): Promise<Announcement> {
    const db = this.firebase.app.firestore();
    const documentRef = db
      .collection(CHATS_COLLECTION)
      .doc(chatId.toString())
      .collection(CHAT_ANNOUNCEMENTS_COLLECTION)
      .doc(id);

    const querySnapshot = await documentRef.get();

    if (!querySnapshot.exists) {
      return AnnouncementMapper.toDomainDefault();
    }

    return AnnouncementMapper.toDomain(querySnapshot.data());
  }

  async getAll(chatId: Announcement['chatId']): Promise<Announcement[]> {
    const db = this.firebase.app.firestore();
    const collectionRef = db
      .collection(CHATS_COLLECTION)
      .doc(chatId.toString())
      .collection(CHAT_ANNOUNCEMENTS_COLLECTION);

    const querySnapshot = await collectionRef.orderBy('title', 'asc').get();
    const docs = querySnapshot.docs;

    return docs.map((doc) => AnnouncementMapper.toDomain(doc.data()));
  }

  async update(
    id: Announcement['id'],
    chatId: Announcement['chatId'],
    data: Partial<Pick<Announcement, 'title' | 'text'>>,
  ): Promise<void> {
    const db = this.firebase.app.firestore();
    const docRef = db
      .collection(CHATS_COLLECTION)
      .doc(chatId.toString())
      .collection(CHAT_ANNOUNCEMENTS_COLLECTION)
      .doc(id);

    await docRef.update(data);
  }

  async deleteById(id: Announcement['id'], chatId: Announcement['chatId']): Promise<void> {
    const db = this.firebase.app.firestore();
    const docRef = db
      .collection(CHATS_COLLECTION)
      .doc(chatId.toString())
      .collection(CHAT_ANNOUNCEMENTS_COLLECTION)
      .doc(id);

    await docRef.delete();
  }
}
