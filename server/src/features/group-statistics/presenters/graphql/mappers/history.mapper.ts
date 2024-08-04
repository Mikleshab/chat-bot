import { StatisticsHistoryObject } from '@features/group-statistics/presenters/graphql/dto/statistics-history.object';

export class HistoryMapper {
  static toObjectType(history: { title: string; color: string; text: string; value: number }): StatisticsHistoryObject {
    return new StatisticsHistoryObject(history.title, history.color, history.text, history.value);
  }
}
