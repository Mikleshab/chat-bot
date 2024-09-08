import { Module } from '@nestjs/common';
import { STATISTICS_REPOSITORY_PROVIDER } from '@features/chat-statistics/infrastructure/firebase/providers/message.provider';
import { StatisticsRepository } from '@features/chat-statistics/application/repositories/statistics.repository';

@Module({
  providers: [STATISTICS_REPOSITORY_PROVIDER],
  exports: [StatisticsRepository],
})
export class FirebaseModule {}
