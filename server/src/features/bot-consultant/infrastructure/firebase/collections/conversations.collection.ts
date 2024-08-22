import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { ConversationRepository } from '@features/bot-consultant/application/conversation.repository';
import { Conversation } from '@features/bot-consultant/domain/value-objects/conversation';
import { ConversationMapper } from '@features/bot-consultant/infrastructure/firebase/mappers/conversation.mapper';

export class ConversationsCollection implements ConversationRepository {
  private readonly collectionName = 'conversations';

  constructor(private readonly firebase: FirebaseService) {}

  async getConversations(filter?: { clientIds: Conversation['client']['userId'][] }): Promise<Conversation[]> {
    const db = this.firebase.app.firestore();
    let conversationsRef = db.collection(this.collectionName);

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
