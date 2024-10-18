import { Module } from '@nestjs/common';
import { CHAT_EVENT_REPOSITORY_PROVIDER } from './providers/announcements.provider';
import { ChatEventRepository } from '@features/events/application/repositories/chat-event.repository';

@Module({
  providers: [CHAT_EVENT_REPOSITORY_PROVIDER],
  exports: [ChatEventRepository],
})
export class FirebaseModule {}
