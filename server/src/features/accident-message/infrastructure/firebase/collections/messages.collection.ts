import { CollectionsDirector } from '@libs/firebase/types';
import { AccidentMessageRepository } from '@features/accident-message/application/accident-message.repository';

export class MessagesCollection implements AccidentMessageRepository {
  constructor(private readonly director: CollectionsDirector) {}

  async getAccidentPreventions(): Promise<object> {
    return this.director.getData<{ text: string }>('messages', 'accident');
  }
}
