import { LoggerRepository } from '@features/logger/application/repositories/logger.repository';
import { LOGGER_REPOSITORY_PROVIDER } from '@features/logger/infrastructure/firebase/providers/message.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [LOGGER_REPOSITORY_PROVIDER],
  exports: [LoggerRepository],
})
export class FirebaseModule {}
