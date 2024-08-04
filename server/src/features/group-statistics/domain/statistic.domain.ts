export class StatisticDomain {
  static create(title: string, text: string, count: number, domainsHistory: { date: number }[]): StatisticDomain {
    const groupedMessages = this.groupByWeeks(domainsHistory, 7);

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

    return new StatisticDomain(title, count, diff, icon, history);
  }

  constructor(
    public readonly title: string, // текст `Пользователи`
    public readonly count: number, // общее количество пользователей
    public readonly diff: string, // разница между последним и предпоследним знаением value из history
    public readonly icon: string,
    public readonly history: {
      title: string; // дата
      color: string;
      text: string; // текст `количество сообщений`
      value: number; // количество сообщений на дату
    }[], // последние 7 недель,
  ) {}

  private static groupByWeeks(domains: { date: number }[], days: number): { date: number }[][] {
    const groups: { date: number }[][] = [];
    let currentGroup: { date: number }[] = [];
    let currentDate = domains.length > 0 ? domains[0].date : Math.floor(Date.now() / 1000);

    for (const message of domains) {
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
