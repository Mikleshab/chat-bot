import { Module } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { GooglePersistenceModule } from '../infrastructure/persistence/google/google-persistence.module';
import { TelegramPresenterModule } from '../presenters/telegram/telegram-presenter.module';
import { TelegramPresenterService } from '../presenters/telegram/telegram-presenter.service';
import { GreetingsController } from '../presenters/http/controllers/greetings.controller';

@Module({
  providers: [ChatBotService, TelegramPresenterService],
  controllers: [GreetingsController],
  imports: [
    GooglePersistenceModule,
    TelegramPresenterModule,
  ],
  exports: [ChatBotService]
})
export class ChatBotModule {
}
