import { Injectable } from '@nestjs/common';
import { StatisticsRepository } from '@features/chat-statistics/application/repositories/statistics.repository';
import { Statistic } from '@features/chat-statistics/domain/models/statistic';

@Injectable()
export class GroupStatisticsService {
  constructor(private readonly messagesRepository: StatisticsRepository) {}

  async getMessagesStatistics(): Promise<Statistic> {
    const count = await this.messagesRepository.getMessagesCount();
    const messageHistory = await this.messagesRepository.getMessageHistory();

    return Statistic.create(`Сообщения`, `Количество сообщений`, count, messageHistory);
  }

  async getMembersStatistics(): Promise<Statistic> {
    const count = await this.messagesRepository.getMembersCount();
    const membersHistory = await this.messagesRepository.getMembersHistory();

    return Statistic.create(`Пользователи`, `Количество пользователей`, count, membersHistory);
  }
}
