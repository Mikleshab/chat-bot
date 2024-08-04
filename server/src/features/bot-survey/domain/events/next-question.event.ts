import { IEvent } from '@nestjs/cqrs';
import { SurveyMessageDomain } from '@features/bot-survey/domain/survey-message.domain';

export class NextQuestionEvent implements IEvent {
  constructor(
    public readonly userId: number,
    public readonly survey: SurveyMessageDomain,
    public readonly questionIndex: number,
  ) {}
}
