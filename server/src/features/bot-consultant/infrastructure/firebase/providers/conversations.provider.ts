import { Provider } from '@nestjs/common';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { ConversationRepository } from '@features/bot-consultant/application/conversation.repository';
import { ConversationsCollection } from '@features/bot-consultant/infrastructure/firebase/collections/conversations.collection';

export const CONVERSATIONS_REPOSITORY_PROVIDER: Provider = {
  provide: ConversationRepository,
  useFactory: (service: FirebaseService): ConversationRepository => {
    return new ConversationsCollection(service);
  },
  inject: [FirebaseService],
};
