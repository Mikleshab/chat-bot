import { LeftChatMemberEvent } from '@features/chat-bot/application/events/left-chat-member.event';
import { LogLeftMemberCommand } from '@features/logger/application/commands/log-left-member.command';
import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { delay, map, Observable } from 'rxjs';

@Injectable()
export class LeftChatMemberSagas {
  @Saga()
  memberLeft = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(LeftChatMemberEvent),
      delay(300),
      map((event) => new LogLeftMemberCommand(event.chat.id, event.memberId)),
    );
  };
}
