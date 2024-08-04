import { Provider } from '@nestjs/common';
import { WelcomeMessageRepository } from '@features/welcome-message/application/welcome-message.repository';
import { COLLECTION_DIRECTOR } from '@libs/firebase/firebase.module';
import { MessagesCollection } from '@features/welcome-message/infrastructure/firebase/collections/messages.collection';
import { CollectionsDirector } from '@libs/firebase/types';

export const WELCOME_MESSAGE_REPOSITORY_PROVIDER: Provider = {
  provide: WelcomeMessageRepository,
  useFactory: (director: CollectionsDirector): WelcomeMessageRepository => {
    return new MessagesCollection(director);
  },
  inject: [COLLECTION_DIRECTOR],
};
