import { Provider } from '@nestjs/common';
import { COLLECTION_DIRECTOR } from '@libs/firebase/firebase.module';
import { CollectionsDirector } from '@libs/firebase/types';
import { ConsultantRepository } from '@features/bot-consultant/application/consultant.repository';
import { ConsultantCollection } from '@features/bot-consultant/infrastructure/firebase/collections/consultant.collection';

export const CONSULTANT_REPOSITORY_PROVIDER: Provider = {
  provide: ConsultantRepository,
  useFactory: (director: CollectionsDirector): ConsultantRepository => {
    return new ConsultantCollection(director);
  },
  inject: [COLLECTION_DIRECTOR],
};
