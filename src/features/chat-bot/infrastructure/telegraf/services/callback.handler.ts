import { CallbackQuery } from 'telegraf/typings/core/types/typegram';
import { BotService } from './bot.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CallbackHandler {
  constructor(private readonly service: BotService) {}

  handle(callback: (data: unknown, ctx: unknown) => void): void {
    this.service.getBot().on('callback_query', (ctx) => {
      const callbackQuery = ctx.callbackQuery as CallbackQuery.DataQuery;
      const data = JSON.parse(callbackQuery.data);

      callback(data, ctx);

      ctx.answerCbQuery();
    });
  }
}
