import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TelegramConfiguration } from '@libs/telegram-bot/config';
import { SecretsService } from '@libs/aws/secrets.service';

@Injectable()
export class TelegramBotService {
  public bot!: Telegraf;

  constructor(
    private configService: ConfigService<TelegramConfiguration>,
    private readonly secretsService: SecretsService,
  ) {}

  async init() {
    // const token = this.configService.get<string>('botToken', '');
    const token = await this.secretsService.getSecret('prod/TELEGRAM_BOT_TOKEN');

    this.bot = new Telegraf(token);
  }
}
