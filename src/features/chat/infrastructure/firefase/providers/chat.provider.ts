import { Provider } from '@nestjs/common';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { ChatRepository } from '@features/chat/application/repositories/chat.repository';
import { ChatsCollection } from '@features/chat/infrastructure/firefase/collections/chats.collection';

export const CHAT_REPOSITORY_PROVIDER: Provider = {
  provide: ChatRepository,
  useFactory: (service: FirebaseService): ChatRepository => {
    return new ChatsCollection(service);
  },
  inject: [FirebaseService],
};
