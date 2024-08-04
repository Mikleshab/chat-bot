import { Module } from '@nestjs/common';
import { WELCOME_MESSAGE_REPOSITORY_PROVIDER } from '@features/welcome-message/infrastructure/firebase/providers/message.provider';
import { WelcomeMessageRepository } from '@features/welcome-message/application/welcome-message.repository';

@Module({
  providers: [WELCOME_MESSAGE_REPOSITORY_PROVIDER],
  exports: [WelcomeMessageRepository],
})
export class FirebaseModule {}
