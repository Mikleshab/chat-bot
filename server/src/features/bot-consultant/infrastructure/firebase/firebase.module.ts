import { Module } from '@nestjs/common';
import { CONSULTANT_REPOSITORY_PROVIDER } from '@features/bot-consultant/infrastructure/firebase/providers/consultant.provider';
import { ConsultantRepository } from '@features/bot-consultant/application/consultant.repository';

@Module({
  providers: [CONSULTANT_REPOSITORY_PROVIDER],
  exports: [ConsultantRepository],
})
export class FirebaseModule {}
