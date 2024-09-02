import { BotService } from './bot.service';

export class CommandHandler {
  constructor(private readonly service: BotService) {}

  handle<T extends string>(command: T, callback: (ctx: unknown) => void): void {
    this.service.getBot().hears(command, callback);
  }
}
