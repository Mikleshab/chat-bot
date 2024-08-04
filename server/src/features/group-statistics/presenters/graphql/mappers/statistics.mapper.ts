import { TelegramStatisticObject } from '@features/group-statistics/presenters/graphql/dto/statistics.object';
import { HistoryMapper } from '@features/group-statistics/presenters/graphql/mappers/history.mapper';
import { StatisticDomain } from '@features/group-statistics/domain/statistic.domain';

export class StatisticsMapper {
  static toObjectType(domain: StatisticDomain): TelegramStatisticObject {
    return new TelegramStatisticObject(
      domain.title,
      `${domain.count}`,
      domain.diff,
      domain.icon,
      domain.history.map(HistoryMapper.toObjectType),
    );
  }
}
