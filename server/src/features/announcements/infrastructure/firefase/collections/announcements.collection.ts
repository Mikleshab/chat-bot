import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { AnnouncementsRepository } from '../../../application/repositories/announcements.repository';
import { Announcement } from '../../../domain/model/announcement';
import { AnnouncementMapper } from '../mappers/announcemet.mapper';

export class AnnouncementsCollection implements AnnouncementsRepository {
  private readonly collectionName = 'announcements';

  constructor(private readonly firebase: FirebaseService) {}

  async create(data: Omit<Announcement, 'id'>): Promise<void> {
    const db = this.firebase.app.firestore();
    const docRef = db.collection(this.collectionName).doc();

    await docRef.set({ ...data, id: docRef.id });
  }

  async getOneById(id: Announcement['id']): Promise<Announcement> {
    const db = this.firebase.app.firestore();
    const documentRef = db.collection(this.collectionName).doc(id);

    const querySnapshot = await documentRef.get();

    if (!querySnapshot.exists) {
      return AnnouncementMapper.toDomainDefault();
    }

    return AnnouncementMapper.toDomain(querySnapshot.data());
  }

  async getAll(chatId: Announcement['chatId']): Promise<Announcement[]> {
    const db = this.firebase.app.firestore();
    const collectionRef = db.collection(this.collectionName);

    const query = collectionRef.where('chatId', '==', chatId);

    const querySnapshot = await query.orderBy('title', 'asc').get();

    const docs = querySnapshot.docs;

    return docs.map((doc) => AnnouncementMapper.toDomain(doc.data()));
  }

  async update(id: Announcement['id'], data: Partial<Omit<Announcement, 'id'>>): Promise<void> {
    const db = this.firebase.app.firestore();
    const docRef = db.collection(this.collectionName).doc(id);

    await docRef.update(data);
  }

  async deleteById(id: Announcement['id']): Promise<void> {
    const db = this.firebase.app.firestore();
    const docRef = db.collection(this.collectionName).doc(id);

    await docRef.delete();
  }
}
