import { Module } from '@nestjs/common';
import { MESSAGES_REPOSITORY_PROVIDER } from '@features/consultant/infrastructure/firebase/providers/messages.provider';
import { CONVERSATIONS_REPOSITORY_PROVIDER } from '@features/consultant/infrastructure/firebase/providers/conversations.provider';
import { MessageRepository } from '@features/consultant/application/ports/message.repository';
import { ConversationRepository } from '@features/consultant/application/ports/conversation.repository';

@Module({
  providers: [MESSAGES_REPOSITORY_PROVIDER, CONVERSATIONS_REPOSITORY_PROVIDER],
  exports: [MessageRepository, ConversationRepository],
})
export class FirebaseModule {}
