import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { TelegramConfiguration } from '@libs/telegram-bot/config';

@Injectable()
export class TelegrafBotService {
  private readonly bot: Telegraf;

  constructor(configService: ConfigService<TelegramConfiguration>) {
    const token = configService.get<string>('botToken', '');
    this.bot = new Telegraf(token);
  }

  getBot(): Telegraf {
    return this.bot;
  }
}
