import { Provider } from '@nestjs/common';
import { TelegramRepository } from '@features/bot-consultant/application/ports/telegram.repository';
import { BOT_SENDER } from '@libs/telegram-bot/telegram-bot.module';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';
import { TelegrafTelegramRepository } from '@features/bot-consultant/infrastructure/telegram/repositories/telegraf-telegram.repository';

export const TELEGRAM_REPOSITORY_PROVIDER: Provider = {
  provide: TelegramRepository,
  useFactory: (sender: TelegramBotSender): TelegramRepository => {
    return new TelegrafTelegramRepository(sender);
  },
  inject: [BOT_SENDER],
};
