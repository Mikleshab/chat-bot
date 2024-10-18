export class Analytics {
  constructor(
    public readonly title: string,
    public readonly count: number,
    public readonly diff: string,
    public readonly icon: string,
    public readonly history: {
      title: string;
      color: string;
      text: string;
      value: number;
    }[],
  ) {}
}
