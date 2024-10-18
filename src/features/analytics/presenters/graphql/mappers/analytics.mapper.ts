import { HistoryMapper } from '@features/analytics/presenters/graphql/mappers/history.mapper';
import { Analytics } from '@features/analytics/domain/models/analytics';
import { AnalyticsObject } from '@features/analytics/presenters/graphql/dto/analytics.object';

export class AnalyticsMapper {
  static toObjectType(analytics: Analytics): AnalyticsObject {
    return new AnalyticsObject(
      analytics.title,
      `${analytics.count}`,
      analytics.diff,
      analytics.icon,
      analytics.history.map(HistoryMapper.toObjectType),
    );
  }
}
