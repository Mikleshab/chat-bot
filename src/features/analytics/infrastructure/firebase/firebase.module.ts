import { AnalyticsRepository } from '@features/analytics/application/repositories/analytics.repository';
import { ANALYTICS_REPOSITORY_PROVIDER } from '@features/analytics/infrastructure/firebase/providers/analytics.provider';
import { CollectionService } from '@features/analytics/infrastructure/firebase/services/collection.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ANALYTICS_REPOSITORY_PROVIDER, CollectionService],
  exports: [AnalyticsRepository],
})
export class FirebaseModule {}
