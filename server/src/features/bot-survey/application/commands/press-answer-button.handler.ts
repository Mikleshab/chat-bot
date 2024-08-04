import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SurveyMessageDomain } from '@features/bot-survey/domain/survey-message.domain';
import { PressAnswerButtonCommand } from '@features/bot-survey/application/commands/press-answer-button.command';
import { NextQuestionEvent } from '@features/bot-survey/domain/events/next-question.event';
import { FinishSurveyMessageEvent } from '@features/bot-survey/domain/events/finish-survey-message.event';
import { SaveAnswerEvent } from '@features/bot-survey/domain/events/save-answer.event';

@CommandHandler(PressAnswerButtonCommand)
export class PressSurveyButtonHandler implements ICommandHandler<PressAnswerButtonCommand, void> {
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: PressAnswerButtonCommand) {
    const { userId, questionIndex, answerIndex } = command;

    const survey = SurveyMessageDomain.create(SurveyMessageDomain);

    this.eventBus.publish(new SaveAnswerEvent(userId, questionIndex, answerIndex));

    if (survey.isLastQuestion(questionIndex)) {
      survey.text = `Опрос окончен`;
      this.eventBus.publish(new FinishSurveyMessageEvent(userId, survey));
    } else {
      this.eventBus.publish(new NextQuestionEvent(userId, survey, questionIndex + 1));
    }
  }
}
