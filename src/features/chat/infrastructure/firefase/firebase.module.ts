import { Module } from '@nestjs/common';
import { CHAT_REPOSITORY_PROVIDER } from './providers/chat.provider';
import { ChatRepository } from '@features/chat/application/repositories/chat.repository';

@Module({
  providers: [CHAT_REPOSITORY_PROVIDER],
  exports: [ChatRepository],
})
export class FirebaseModule {}
