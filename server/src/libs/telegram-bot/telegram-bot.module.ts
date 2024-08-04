import { Global, Module } from '@nestjs/common';
import { TelegramConfigInitializer } from '@libs/telegram-bot/config';
import { BotCallbackService } from '@libs/telegram-bot/services/bot-callback.service';
import { TelegramBotService } from '@libs/telegram-bot/services/telegram-bot.service';
import { BotSenderService } from '@libs/telegram-bot/services/bot-sender.service';
import { BotHandlerService } from '@libs/telegram-bot/services/bot-handler.service';
import { BotHearsService } from '@libs/telegram-bot/services/bot-hears.service';

export const BOT_SENDER = 'BotSender';
export const BOT_EVENT_HANDLER = 'BotEventHandler';
export const BOT_CALLBACK_HANDLER = 'BotCallbackHandler';
export const BOT_HEARS = 'BotHears';

@Global()
@Module({
  imports: [TelegramConfigInitializer],
  providers: [
    TelegramBotService,
    {
      provide: BOT_SENDER,
      useFactory: (telegramBotService: TelegramBotService) => {
        return new BotSenderService(telegramBotService);
      },
      inject: [TelegramBotService],
    },
    {
      provide: BOT_EVENT_HANDLER,
      useFactory: (telegramBotService: TelegramBotService) => {
        return new BotHandlerService(telegramBotService);
      },
      inject: [TelegramBotService],
    },
    {
      provide: BOT_HEARS,
      useFactory: (telegramBotService: TelegramBotService) => {
        return new BotHearsService(telegramBotService);
      },
      inject: [TelegramBotService],
    },
    {
      provide: BOT_CALLBACK_HANDLER,
      useFactory: (telegramBotService: TelegramBotService) => {
        return new BotCallbackService(telegramBotService);
      },
      inject: [TelegramBotService],
    },
  ],
  exports: [TelegramBotService, BOT_SENDER, BOT_EVENT_HANDLER, BOT_HEARS, BOT_CALLBACK_HANDLER],
})
export class TelegramBotModule {}
