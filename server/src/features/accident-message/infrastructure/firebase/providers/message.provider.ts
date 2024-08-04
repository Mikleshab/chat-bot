import { Provider } from '@nestjs/common';
import { COLLECTION_DIRECTOR } from '@libs/firebase/firebase.module';
import { CollectionsDirector } from '@libs/firebase/types';
import { AccidentMessageRepository } from '@features/accident-message/application/accident-message.repository';
import { MessagesCollection } from '@features/accident-message/infrastructure/firebase/collections/messages.collection';

export const ACCIDENT_MESSAGE_REPOSITORY_PROVIDER: Provider = {
  provide: AccidentMessageRepository,
  useFactory: (director: CollectionsDirector): AccidentMessageRepository => {
    return new MessagesCollection(director);
  },
  inject: [COLLECTION_DIRECTOR],
};
