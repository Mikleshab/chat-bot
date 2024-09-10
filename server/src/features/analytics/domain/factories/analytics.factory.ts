import { Analytics } from '@features/analytics/domain/models/analytics';
import { Data } from '@features/analytics/domain/value-objects/data';
import { DateTime } from 'luxon';

export class AnalyticsFactory {
  static create(title: string, text: string, count: number, data: Data[]): Analytics {
    const segmentedData = this.splitDataIntoSegments(data);

    const history = segmentedData.map((group) => {
      const messageCount = group.count;
      return {
        title: new Date(group.date).toLocaleDateString(),
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

  private static splitDataIntoSegments(data: Data[]): { date: Date; count: number }[] {
    const result: { date: Date; count: number }[] = [];

    data.sort((a, b) => a.date - b.date);

    let currentDate = DateTime.now().startOf('day').toMillis();
    let accumulatedCount = 0;

    const segments: { start: number; end: number }[] = [];

    for (let i = 0; i < 7; i++) {
      const nextDate = DateTime.fromMillis(currentDate).minus({ days: 7 }).toMillis();

      segments.push({ start: nextDate, end: currentDate });

      currentDate = nextDate;
    }

    segments.reverse().forEach((segment) => {
      const segmentData = data.filter((item) => item.date >= segment.start && item.date < segment.end);

      accumulatedCount += segmentData.length;

      result.push({
        date: new Date(segment.end),
        count: accumulatedCount,
      });
    });

    return result;
  }
}
