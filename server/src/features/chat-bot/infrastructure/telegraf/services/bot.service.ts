import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Configuration } from '../config/config.schema';

@Injectable()
export class BotService {
  private readonly bot: Telegraf;

  constructor(configService: ConfigService<Configuration>) {
    const token = configService.get<string>('botToken', '');
    this.bot = new Telegraf(token);
  }

  getBot() {
    return this.bot;
  }
}
