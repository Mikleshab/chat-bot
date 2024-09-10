import { Analytics } from '@features/analytics/domain/models/analytics';
import { Data } from '@features/analytics/domain/value-objects/data';

export class AnalyticsFactory {
  static create(title: string, text: string, count: number, data: Data[]): Analytics {
    const groupedMessages = this.groupByWeeks(data, 7);

    const history = groupedMessages.map((group) => {
      const messageCount = group.length;
      return {
        title: new Date(group[0].date * 1000).toLocaleDateString(),
        color: 'blue',
        text,
        value: messageCount,
      };
    });

    const lastCount = history[history.length - 1]?.value || 0;
    const secondLastCount = history[history.length - 2]?.value || 0;
    const diff =
      secondLastCount === 0 ? '100.00%' : `${(((lastCount - secondLastCount) / secondLastCount) * 100).toFixed(2)}%`;
    const icon = diff >= '0' ? 'Top' : 'Bottom';

    return new Analytics(title, count, diff, icon, history);
  }

  private static groupByWeeks(data: Data[], days: number): { date: number }[][] {
    const groups: Data[][] = [];
    let currentGroup: Data[] = [];
    let currentDate = data.length > 0 ? data[0].date : Math.floor(Date.now() / 1000);

    for (const message of data) {
      if (message.date < currentDate + days * 24 * 60 * 60) {
        currentGroup.push(message);
      } else {
        groups.push(currentGroup);
        currentGroup = [message];
        currentDate = message.date;
      }
    }

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  }
}
