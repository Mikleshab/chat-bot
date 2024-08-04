import { Provider } from '@nestjs/common';
import { COLLECTION_DIRECTOR } from '@libs/firebase/firebase.module';
import { CollectionsDirector } from '@libs/firebase/types';
import { StartPrivateChatMessageRepository } from '@features/start-private-chat-message/application/start-private-chat-message.repository';
import { MessagesCollection } from '@features/start-private-chat-message/infrastructure/firebase/collections/messages.collection';

export const PRIVATE_CHAT_MESSAGE_REPOSITORY_PROVIDER: Provider = {
  provide: StartPrivateChatMessageRepository,
  useFactory: (director: CollectionsDirector): StartPrivateChatMessageRepository => {
    return new MessagesCollection(director);
  },
  inject: [COLLECTION_DIRECTOR],
};
