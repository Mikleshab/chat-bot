import { TelegramConfigInitializer } from '@libs/telegram-bot/config';
import { TelegramBotService } from '@libs/telegram-bot/services/telegram-bot.service';
import { Global, Module, OnModuleInit } from '@nestjs/common';
import { SecretsService } from '@libs/aws/secrets.service';

@Global()
@Module({
  imports: [TelegramConfigInitializer],
  providers: [TelegramBotService, SecretsService],
  exports: [TelegramBotService],
})
export class TelegramBotModule implements OnModuleInit {
  constructor(private telegramBotService: TelegramBotService) {}

  async onModuleInit() {
    await this.telegramBotService.init();
  }
}
