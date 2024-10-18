import { ConversationRepository } from '@features/consultant/application/ports/conversation.repository';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';
import { ConversationMapper } from '@features/consultant/infrastructure/firebase/mappers/conversation.mapper';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { CONVERSATIONS } from 'src/common/constants/collections';

export class ConversationsCollection implements ConversationRepository {
  constructor(private readonly firebase: FirebaseService) {}

  async getConversations(filter?: { clientIds: Conversation['client']['userId'][] }): Promise<Conversation[]> {
    const db = this.firebase.app.firestore();
    const conversationsRef = db.collection(CONVERSATIONS);

    const query = filter?.clientIds?.length
      ? conversationsRef.where('client.userId', 'in', filter.clientIds)
      : conversationsRef;

    const querySnapshot = await query.orderBy('updatedAt', 'desc').get();

    if (querySnapshot.empty) {
      return [];
    }

    const docs = querySnapshot.docs;

    return docs.map((doc) => ConversationMapper.toDomain(doc.data()));
  }
}
