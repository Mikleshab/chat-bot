import { Module } from '@nestjs/common';
import { AccidentMessageRepository } from '@features/accident-message/application/accident-message.repository';
import { ACCIDENT_MESSAGE_REPOSITORY_PROVIDER } from '@features/accident-message/infrastructure/firebase/providers/message.provider';

@Module({
  providers: [ACCIDENT_MESSAGE_REPOSITORY_PROVIDER],
  exports: [AccidentMessageRepository],
})
export class FirebaseModule {}
