import { Module, OnModuleInit } from '@nestjs/common';
import { TelegramBotService } from '@libs/telegram-bot/services/telegram-bot.service';

@Module({})
export class BotInitializer implements OnModuleInit {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  onModuleInit() {
    this.telegramBotService.bot.launch();
  }
}
