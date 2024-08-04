import { IEvent } from '@nestjs/cqrs';

export class SaveAnswerEvent implements IEvent {
  constructor(
    public readonly userId: number,
    public readonly questionIndex: number,
    public readonly answerIndex: number,
  ) {}
}
