import { Inject } from '@nestjs/common';
import { COLLECTION_DIRECTOR } from '@libs/firebase/firebase.module';
import { CollectionsDirector } from '@libs/firebase/types';
import { StatisticsRepository } from '@features/chat-statistics/application/repositories/statistics.repository';
import { Message } from '@features/chat-statistics/domain/models/message';
import { Member } from '@features/chat-statistics/domain/models/member';

export class MessagesCollection implements StatisticsRepository {
  constructor(@Inject(COLLECTION_DIRECTOR) private readonly director: CollectionsDirector) {}

  async getMessagesCount(): Promise<number> {
    const data = await this.director.getData<{ count: number }>('counters', 'group-messages');

    return data.count;
  }

  async getMessageHistory(): Promise<Message[]> {
    const sevenWeeksAgo = new Date();
    sevenWeeksAgo.setDate(sevenWeeksAgo.getDate() - 7 * 7);
    const collection = await this.director.getCollection('group-messages', { fromDate: sevenWeeksAgo });

    return collection.map(Message.create);
  }

  async getMembersCount(): Promise<number> {
    const data = await this.director.getData<{ count: number }>('counters', 'group-members');

    return data.count;
  }

  async getMembersHistory(): Promise<Member[]> {
    const sevenWeeksAgo = new Date();
    sevenWeeksAgo.setDate(sevenWeeksAgo.getDate() - 7 * 7);
    const collection = await this.director.getCollection('group-members', { fromDate: sevenWeeksAgo });

    return collection.map(Member.create);
  }

  async saveMessage(messageDomain: Message): Promise<void> {
    await this.director.saveData('group-messages', `${messageDomain.id}`, messageDomain.toObject());
  }

  async saveMember(memberDomain: Member): Promise<void> {
    await this.director.saveData('group-members', `${memberDomain.userId}`, memberDomain.toObject());
  }

  async deleteMember(id: Member['userId']): Promise<void> {
    await this.director.deleteData('group-members', `${id}`);
  }
}
