import { Module, OnModuleInit } from '@nestjs/common';
import { ShowBotMenuHandler } from '@features/bot-menu/application/show-bot-menu.handler';
import { SendBotMenuHandler } from '@features/bot-menu/application/send-bot-menu.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TelegramHandler } from '@features/bot-menu/presenters/telegram/telegram.handler';

@Module({
  providers: [ShowBotMenuHandler, SendBotMenuHandler, TelegramHandler],
  imports: [CqrsModule],
})
export class BotMenuModule implements OnModuleInit {
  constructor(private readonly telegramHandler: TelegramHandler) {}

  onModuleInit() {
    this.telegramHandler.listen();
  }
}
