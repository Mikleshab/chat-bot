import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { ReplySentEvent } from '@features/bot-consultant/domain/events/reply-sent.event';
import { ReplaceMessageIdCommand } from '@features/bot-consultant/application/commands/replace-message-id.command';

@Injectable()
export class MessagesSagas {
  @Saga()
  replySent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ReplySentEvent),
      map((event) => new ReplaceMessageIdCommand(event.messageId, event.telegramMessageId)),
    );
  };
}
