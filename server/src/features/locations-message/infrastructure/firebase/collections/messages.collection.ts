import { CollectionsDirector } from '@libs/firebase/types';
import { LocationsMessageRepository } from '@features/locations-message/application/locations-message.repository';

export class MessagesCollection implements LocationsMessageRepository {
  constructor(private readonly director: CollectionsDirector) {}

  async getLocations(): Promise<object> {
    return this.director.getData<{ text: string }>('messages', 'locations');
  }
}
