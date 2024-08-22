import { Provider } from '@nestjs/common';
import { MessageRepository } from '@features/bot-consultant/application/message.repository';
import { MessagesCollection } from '@features/bot-consultant/infrastructure/firebase/collections/messages.collection';
import { FirebaseService } from '@libs/firebase/services/firebase.service';

export const MESSAGES_REPOSITORY_PROVIDER: Provider = {
  provide: MessageRepository,
  useFactory: (service: FirebaseService): MessageRepository => {
    return new MessagesCollection(service);
  },
  inject: [FirebaseService],
};
