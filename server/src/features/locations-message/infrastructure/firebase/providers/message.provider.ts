import { Provider } from '@nestjs/common';
import { COLLECTION_DIRECTOR } from '@libs/firebase/firebase.module';
import { CollectionsDirector } from '@libs/firebase/types';
import { LocationsMessageRepository } from '@features/locations-message/application/locations-message.repository';
import { MessagesCollection } from '@features/locations-message/infrastructure/firebase/collections/messages.collection';

export const LOCATIONS_MESSAGE_REPOSITORY_PROVIDER: Provider = {
  provide: LocationsMessageRepository,
  useFactory: (director: CollectionsDirector): LocationsMessageRepository => {
    return new MessagesCollection(director);
  },
  inject: [COLLECTION_DIRECTOR],
};
