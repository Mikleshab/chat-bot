import { Module } from '@nestjs/common';
import { MESSAGES_REPOSITORY_PROVIDER } from '@features/bot-consultant/infrastructure/firebase/providers/messages.provider';
import { MessageRepository } from '@features/bot-consultant/application/message.repository';
import { CONVERSATIONS_REPOSITORY_PROVIDER } from '@features/bot-consultant/infrastructure/firebase/providers/conversations.provider';
import { ConversationRepository } from '@features/bot-consultant/application/conversation.repository';

@Module({
  providers: [MESSAGES_REPOSITORY_PROVIDER, CONVERSATIONS_REPOSITORY_PROVIDER],
  exports: [MessageRepository, ConversationRepository],
})
export class FirebaseModule {}
