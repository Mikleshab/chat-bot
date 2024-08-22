import { TelegramBotService } from '@libs/telegram-bot/services/telegram-bot.service';
import { message } from 'telegraf/filters';
import { BotEventType, TelegramBotHandler } from '@libs/telegram-bot/types/handler.interface';

export class BotHandlerService implements TelegramBotHandler {
  private eventCallbacks: { [key in BotEventType]?: Array<(ctx: any) => void> } = {};

  constructor(private readonly telegramBotService: TelegramBotService) {}

  handleEvent(type: BotEventType, callback: (ctx: unknown) => void): void {
    if (!this.eventCallbacks[type]) {
      this.eventCallbacks[type] = [];
      this.telegramBotService.bot.on(message(type), (ctx) => {
        this.eventCallbacks[type]!.forEach((cb) => cb(ctx));
      });
    }
    this.eventCallbacks[type]!.push(callback);
  }
}
