import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TelegramConfiguration } from '@libs/telegram-bot/config';

@Injectable()
export class TelegramBotService {
  public readonly bot!: Telegraf;

  constructor(configService: ConfigService<TelegramConfiguration>) {
    const token = configService.get<string>('botToken', '');

    console.log('token tokentoken tokentoken tokentoken tokentoken token', token);
    this.bot = new Telegraf(token);
  }
}
