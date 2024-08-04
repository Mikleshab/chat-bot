import { CollectionsDirector } from '@libs/firebase/types';
import { WelcomeMessageRepository } from '@features/welcome-message/application/welcome-message.repository';
import { WelcomeMessageDomain } from '@features/welcome-message/domain/welcome-message.domain';

export class MessagesCollection implements WelcomeMessageRepository {
  constructor(private readonly director: CollectionsDirector) {}

  async getMessage(): Promise<object> {
    const doc = await this.director.getData('information', 'welcome');

    if (!doc) {
      throw new Error(`Welcome message not found.`);
    }
    return doc;
  }

  async updateMessage(message: WelcomeMessageDomain): Promise<void> {
    await this.director.updateData('information', 'welcome', message.toObject());
  }
}
