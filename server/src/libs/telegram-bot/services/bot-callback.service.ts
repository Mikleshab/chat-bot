import { TelegramBotService } from '@libs/telegram-bot/services/telegram-bot.service';
import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CallbackData } from '@libs/telegram-bot/types/callback-data.type';
import { MenuCallbackDto } from '@libs/bot-menu/types/callback.type';
import { SurveyCallbackDto } from '@libs/bot-survey/types/callback.type';
import { TelegramBotCallback } from '@libs/telegram-bot/types/callback.interface';

export type MenuPayloadDto = MenuCallbackDto | SurveyCallbackDto;

export class BotCallbackService implements TelegramBotCallback {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  handleCallback(callback: (data: MenuPayloadDto, ctx: unknown) => void): void {
    this.telegramBotService.bot.on('callback_query', (ctx) => {
      const callbackQuery = ctx.callbackQuery as CallbackQuery.DataQuery;
      const data = JSON.parse(callbackQuery.data);

      const dto = plainToInstance(CallbackData, data);

      const errors = validateSync(dto);

      if (errors.length > 0) {
        throw new Error(`MenuCallbackDto validation failed. Errors: ${JSON.stringify(errors)}`);
      }

      callback(data, ctx);

      ctx.answerCbQuery();
    });
  }
}
