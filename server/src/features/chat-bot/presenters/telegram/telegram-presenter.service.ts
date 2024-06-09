import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegramConfiguration } from './config';
import { Telegraf } from 'telegraf';
import { ChatBotService } from '../../application/chat-bot.service';
import { WelcomeCommand } from '../../application/commands';

@Injectable()
export class TelegramPresenterService implements OnModuleInit {
  private bot: Telegraf;

  constructor(
    private readonly chatBotService: ChatBotService,
    configService: ConfigService<TelegramConfiguration>
  ) {
    this.bot = new Telegraf(configService.get<string>('botToken', ''));
  }

  onModuleInit(): void {
    this.init();
  }


  private init(): void {
    this.bot.command('greetings', (ctx) =>
      this.chatBotService.welcome(new WelcomeCommand(ctx.message.from?.first_name || '')).then(message => {
        ctx.reply(message);
      })
    );
  }


}
