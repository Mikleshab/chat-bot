export enum ChatEventType {
  GREETINGS = 'GREETINGS',
  RECURRENT = 'RECURRENT',
}

export enum FrequencyType {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export class ChatEventOptions {
  constructor(
    public readonly type: ChatEventType,
    public readonly system: boolean,
    public readonly frequencyType?: FrequencyType,
    public readonly interval?: number,
    public readonly startDate?: Date,
    public readonly endDate?: Date,
  ) {}
}
