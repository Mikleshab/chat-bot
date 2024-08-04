import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TelegramHandler } from '@features/bot-survey/presenters/telegram/telegram.handler';
import { FirebaseModule } from '@features/bot-survey/infrastructure/firebase/firebase.module';
import { StartSurveyHandler } from '@features/bot-survey/application/commands/start-survey.handler';
import { StartSurveyMessageHandler } from '@features/bot-survey/application/events/start-survey-message.handler';
import { FinishSurveyMessageHandler } from '@features/bot-survey/application/events/finish-survey-message.handler';
import { NextQuestionHandler } from '@features/bot-survey/application/events/next-question.handler';
import { PressSurveyButtonHandler } from '@features/bot-survey/application/commands/press-answer-button.handler';
import { SaveAnswerHandler } from '@features/bot-survey/application/commands/save-answer.handler';
import { SurveySagas } from '@features/bot-survey/application/sagas/survey.sagas';

@Module({
  providers: [
    // commands
    PressSurveyButtonHandler,
    StartSurveyHandler,
    SaveAnswerHandler,
    // events
    StartSurveyMessageHandler,
    NextQuestionHandler,
    FinishSurveyMessageHandler,

    SurveySagas,
    TelegramHandler,
  ],
  imports: [CqrsModule, FirebaseModule],
})
export class BotSurveyModule implements OnModuleInit {
  constructor(private readonly telegramHandler: TelegramHandler) {}

  onModuleInit() {
    this.telegramHandler.listen();
  }
}
