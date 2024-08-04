import { Module } from '@nestjs/common';
import { STATISTICS_REPOSITORY_PROVIDER } from '@features/group-statistics/infrastructure/firebase/providers/message.provider';
import { StatisticsRepository } from '@features/group-statistics/application/statistics.repository';

@Module({
  providers: [STATISTICS_REPOSITORY_PROVIDER],
  exports: [StatisticsRepository],
})
export class FirebaseModule {}
