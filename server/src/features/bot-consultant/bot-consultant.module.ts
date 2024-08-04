import { Module, OnModuleInit } from '@nestjs/common';
import { TelegramHandler } from '@features/bot-consultant/presenters/telegram/telegram.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { FirebaseModule } from '@features/bot-consultant/infrastructure/firebase/firebase.module';
import { QuestionSavedMessageHandler } from '@features/bot-consultant/application/question-saved-message.handler';
import { NewQuestionHandler } from '@features/bot-consultant/application/new-question.handler';

@Module({
  providers: [QuestionSavedMessageHandler, NewQuestionHandler, TelegramHandler],
  imports: [CqrsModule, FirebaseModule],
})
export class BotConsultantModule implements OnModuleInit {
  constructor(private readonly telegramHandler: TelegramHandler) {}

  onModuleInit() {
    this.telegramHandler.listen();
  }
}
