import { Injectable } from '@nestjs/common';
import { StatisticsRepository } from '@features/group-statistics/application/statistics.repository';
import { StatisticDomain } from '@features/group-statistics/domain/statistic.domain';

@Injectable()
export class GroupStatisticsService {
  constructor(private readonly messagesRepository: StatisticsRepository) {}

  async getMessagesStatistics(): Promise<StatisticDomain> {
    const count = await this.messagesRepository.getMessagesCount();
    const messageHistory = await this.messagesRepository.getMessageHistory();

    return StatisticDomain.create(`Сообщения`, `Количество сообщений`, count, messageHistory);
  }

  async getMembersStatistics(): Promise<StatisticDomain> {
    const count = await this.messagesRepository.getMembersCount();
    const membersHistory = await this.messagesRepository.getMembersHistory();

    return StatisticDomain.create(`Пользователи`, `Количество пользователей`, count, membersHistory);
  }
}
