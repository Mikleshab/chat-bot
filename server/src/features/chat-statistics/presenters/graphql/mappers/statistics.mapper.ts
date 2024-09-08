import { HistoryMapper } from '@features/chat-statistics/presenters/graphql/mappers/history.mapper';
import { Statistic } from '@features/chat-statistics/domain/models/statistic';
import { StatisticsObject } from '@features/chat-statistics/presenters/graphql/dto/statistics.object';

export class StatisticsMapper {
  static toObjectType(domain: Statistic): StatisticsObject {
    return new StatisticsObject(
      domain.title,
      `${domain.count}`,
      domain.diff,
      domain.icon,
      domain.history.map(HistoryMapper.toObjectType),
    );
  }
}
