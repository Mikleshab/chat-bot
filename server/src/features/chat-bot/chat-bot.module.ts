import { Module, OnModuleInit } from '@nestjs/common';
import { Bot } from './domain/models/bot';
import { TelegrafModule } from './infrastructure/telegraf/telegraf.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, TelegrafModule],
  providers: [Bot],
})
export class ChatBotModule implements OnModuleInit {
  constructor(private readonly bot: Bot) {}

  onModuleInit() {
    this.bot.start();
  }
}
