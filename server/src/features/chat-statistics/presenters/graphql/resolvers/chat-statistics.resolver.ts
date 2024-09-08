import { Query, Resolver } from '@nestjs/graphql';
import { StatisticsObject } from '@features/chat-statistics/presenters/graphql/dto/statistics.object';
import { GroupStatisticsService } from '@features/chat-statistics/application/group-statistics.service';
import { StatisticsMapper } from '@features/chat-statistics/presenters/graphql/mappers/statistics.mapper';

@Resolver(() => StatisticsObject)
export class ChatStatisticsResolver {
  constructor(private readonly telegramStatisticsService: GroupStatisticsService) {}

  @Query(() => StatisticsObject, { name: 'getMessagesStatistics' })
  async getMessagesStatistics() {
    const domain = await this.telegramStatisticsService.getMessagesStatistics();

    return StatisticsMapper.toObjectType(domain);
  }

  @Query(() => StatisticsObject, { name: 'getMembersStatistics' })
  async getMembersStatistics() {
    const domain = await this.telegramStatisticsService.getMembersStatistics();

    return StatisticsMapper.toObjectType(domain);
  }
}
