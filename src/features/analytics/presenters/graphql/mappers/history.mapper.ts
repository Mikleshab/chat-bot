import { AnalyticsHistoryObject } from '@features/analytics/presenters/graphql/dto/analytics-history.object';

export class HistoryMapper {
  static toObjectType(history: { title: string; color: string; text: string; value: number }): AnalyticsHistoryObject {
    return new AnalyticsHistoryObject(history.title, history.color, history.text, history.value);
  }
}
