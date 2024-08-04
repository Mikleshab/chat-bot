import { Module } from '@nestjs/common';
import { PRIVATE_CHAT_MESSAGE_REPOSITORY_PROVIDER } from '@features/start-private-chat-message/infrastructure/firebase/providers/message.provider';
import { StartPrivateChatMessageRepository } from '@features/start-private-chat-message/application/start-private-chat-message.repository';

@Module({
  providers: [PRIVATE_CHAT_MESSAGE_REPOSITORY_PROVIDER],
  exports: [StartPrivateChatMessageRepository],
})
export class FirebaseModule {}
