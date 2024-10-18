import { AnalyticsRepository } from '@features/analytics/application/repositories/analytics.repository';
import { FirebaseAnalyticsRepository } from '@features/analytics/infrastructure/firebase/repositories/firebase-analytics.repository';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { Provider } from '@nestjs/common';

export const ANALYTICS_REPOSITORY_PROVIDER: Provider = {
  provide: AnalyticsRepository,
  useFactory: (firebase: FirebaseService): AnalyticsRepository => {
    return new FirebaseAnalyticsRepository(firebase);
  },
  inject: [FirebaseService],
};
