import { TelegramBotService } from '@libs/telegram-bot/services/telegram-bot.service';
import { TelegramBotHears } from '@libs/telegram-bot/types/hears.interface';

export class BotHearsService implements TelegramBotHears {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  hears<T extends string>(command: T, callback: (ctx: unknown) => void): void {
    this.telegramBotService.bot.hears(command, callback);
  }
}
