import { Query, Resolver } from '@nestjs/graphql';
import { TelegramStatisticObject } from '@features/group-statistics/presenters/graphql/dto/statistics.object';
import { GroupStatisticsService } from '@features/group-statistics/application/group-statistics.service';
import { StatisticsMapper } from '@features/group-statistics/presenters/graphql/mappers/statistics.mapper';

@Resolver(() => TelegramStatisticObject)
export class TelegramStatisticsResolver {
  constructor(private readonly telegramStatisticsService: GroupStatisticsService) {}

  @Query(() => TelegramStatisticObject, { name: 'getMessagesStatistics' })
  async getMessagesStatistics() {
    const domain = await this.telegramStatisticsService.getMessagesStatistics();

    return StatisticsMapper.toObjectType(domain);
  }

  @Query(() => TelegramStatisticObject, { name: 'getMembersStatistics' })
  async getMembersStatistics() {
    const domain = await this.telegramStatisticsService.getMembersStatistics();

    return StatisticsMapper.toObjectType(domain);
  }
}
