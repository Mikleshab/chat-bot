import { CollectionsDirector } from '@libs/firebase/types';
import { StartPrivateChatMessageRepository } from '@features/start-private-chat-message/application/start-private-chat-message.repository';

export class MessagesCollection implements StartPrivateChatMessageRepository {
  constructor(private readonly director: CollectionsDirector) {}

  async getPrivateChatMessage(): Promise<object> {
    return this.director.getData<{ text: string }>('messages', 'private-chat');
  }
}
