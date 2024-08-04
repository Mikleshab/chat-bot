import { Inject } from '@nestjs/common';
import { COLLECTION_DIRECTOR } from '@libs/firebase/firebase.module';
import { CollectionsDirector } from '@libs/firebase/types';
import { StatisticsRepository } from '@features/group-statistics/application/statistics.repository';
import { MessageDomain } from '@features/group-statistics/domain/message.domain';
import { MemberDomain } from '@features/group-statistics/domain/member.domain';

export class MessagesCollection implements StatisticsRepository {
  constructor(@Inject(COLLECTION_DIRECTOR) private readonly director: CollectionsDirector) {}

  async getMessagesCount(): Promise<number> {
    const data = await this.director.getData<{ count: number }>('counters', 'group-messages');

    return data.count;
  }

  async getMessageHistory(): Promise<MessageDomain[]> {
    const sevenWeeksAgo = new Date();
    sevenWeeksAgo.setDate(sevenWeeksAgo.getDate() - 7 * 7);
    const collection = await this.director.getCollection('group-messages', { fromDate: sevenWeeksAgo });

    return collection.map(MessageDomain.create);
  }

  async getMembersCount(): Promise<number> {
    const data = await this.director.getData<{ count: number }>('counters', 'group-members');

    return data.count;
  }

  async getMembersHistory(): Promise<MemberDomain[]> {
    const sevenWeeksAgo = new Date();
    sevenWeeksAgo.setDate(sevenWeeksAgo.getDate() - 7 * 7);
    const collection = await this.director.getCollection('group-members', { fromDate: sevenWeeksAgo });

    return collection.map(MemberDomain.create);
  }

  async saveMessage(messageDomain: MessageDomain): Promise<void> {
    await this.director.saveData('group-messages', `${messageDomain.id}`, messageDomain.toObject());
  }

  async saveMember(memberDomain: MemberDomain): Promise<void> {
    await this.director.saveData('group-members', `${memberDomain.userId}`, memberDomain.toObject());
  }

  async deleteMember(id: MemberDomain['userId']): Promise<void> {
    await this.director.deleteData('group-members', `${id}`);
  }
}
