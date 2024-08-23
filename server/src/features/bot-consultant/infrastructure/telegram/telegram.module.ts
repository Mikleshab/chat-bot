import { Module } from '@nestjs/common';
import { TelegramRepository } from '@features/bot-consultant/application/ports/telegram.repository';
import { TELEGRAM_REPOSITORY_PROVIDER } from '@features/bot-consultant/infrastructure/telegram/providers/telegram.provider';

@Module({
  providers: [TELEGRAM_REPOSITORY_PROVIDER],
  exports: [TelegramRepository],
})
export class TelegramModule {}
