import { PressSurveyButtonHandler } from '@features/bot-survey/application/commands/press-answer-button.handler';
import { SaveAnswerHandler } from '@features/bot-survey/application/commands/save-answer.handler';
import { StartSurveyHandler } from '@features/bot-survey/application/commands/start-survey.handler';
import { FinishSurveyMessageHandler } from '@features/bot-survey/application/events/finish-survey-message.handler';
import { NextQuestionHandler } from '@features/bot-survey/application/events/next-question.handler';
import { StartSurveyMessageHandler } from '@features/bot-survey/application/events/start-survey-message.handler';
import { SurveySagas } from '@features/bot-survey/application/sagas/survey.sagas';
import { FirebaseModule } from '@features/bot-survey/infrastructure/firebase/firebase.module';
import { TelegramHandler } from '@features/bot-survey/presenters/telegram/telegram.handler';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

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
export class BotSurveyModule {}
