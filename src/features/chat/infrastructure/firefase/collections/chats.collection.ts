import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { ChatRepository } from '@features/chat/application/repositories/chat.repository';
import { Chat } from '@features/chat/domain/models/chat';
import { ChatMapper } from '@features/chat/infrastructure/firefase/mappers/chat.mapper';
import { CHATS_COLLECTION } from 'src/common/constants/collections';

export class ChatsCollection implements ChatRepository {
  constructor(private readonly firebase: FirebaseService) {}

  async getAll(): Promise<Chat[]> {
    const db = this.firebase.app.firestore();

    const querySnapshot = await db.collection(CHATS_COLLECTION).get();

    if (querySnapshot.empty) {
      return [];
    }

    const docs = querySnapshot.docs;

    return docs.map((doc) => ChatMapper.toDomain(doc.data()));
  }
}
