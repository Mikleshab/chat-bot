import { Provider } from '@nestjs/common';
import { CollectionsDirector } from '@libs/firebase/types';
import { COLLECTION_DIRECTOR } from '@libs/firebase/firebase.module';
import { StatisticsRepository } from '@features/group-statistics/application/statistics.repository';
import { MessagesCollection } from '@features/group-statistics/infrastructure/firebase/collections/messages.collection';

export const STATISTICS_REPOSITORY_PROVIDER: Provider = {
  provide: StatisticsRepository,
  useFactory: (director: CollectionsDirector): StatisticsRepository => {
    return new MessagesCollection(director);
  },
  inject: [COLLECTION_DIRECTOR],
};
