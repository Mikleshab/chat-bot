import { IEvent } from '@nestjs/cqrs';
import { QuestionSavedMessageDomain } from '@features/bot-consultant/domain/question-saved-message.domain';

export class QuestionSavedMessageEvent implements IEvent {
  constructor(
    readonly userId: number,
    readonly message: QuestionSavedMessageDomain,
  ) {}
}
