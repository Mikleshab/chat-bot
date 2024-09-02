import { message } from 'telegraf/filters';
import { BotService } from './bot.service';

export type BotEventType = 'new_chat_members' | 'left_chat_member' | 'text';

export class EventHandler {
  constructor(private readonly service: BotService) {}

  handle(type: BotEventType, callback: (ctx: unknown) => void): void {
    this.service.getBot().on(message(type), (ctx) => {
      callback(ctx);
    });
  }
}
