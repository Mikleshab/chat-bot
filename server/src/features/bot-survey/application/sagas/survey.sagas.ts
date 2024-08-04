import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { delay, map, Observable } from 'rxjs';
import { SaveAnswerEvent } from '@features/bot-survey/domain/events/save-answer.event';
import { SaveAnswerCommand } from '@features/bot-survey/application/commands/save-answer.command';

@Injectable()
export class SurveySagas {
  @Saga()
  saveQuestion = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SaveAnswerEvent),
      delay(3000),
      map((event) => new SaveAnswerCommand(event.userId, event.questionIndex, event.answerIndex)),
    );
  };
}
