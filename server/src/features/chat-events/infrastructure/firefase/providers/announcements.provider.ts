import { Provider } from '@nestjs/common';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { ChatEventsCollection } from '../collections/chat-events.collection';
import { ChatEventRepository } from '../../../application/repositories/chat-event.repository';

export const CHAT_EVENT_REPOSITORY_PROVIDER: Provider = {
  provide: ChatEventRepository,
  useFactory: (service: FirebaseService): ChatEventRepository => {
    return new ChatEventsCollection(service);
  },
  inject: [FirebaseService],
};
