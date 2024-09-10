import { MemberSentMessageEvent } from '@features/chat-bot/application/events/member-sent-message.event';
import { LogMemberMessageCommand } from '@features/logger/application/commands/log-member-message.command';
import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { delay, map, Observable } from 'rxjs';

@Injectable()
export class SaveMemberMessageSagas {
  @Saga()
  saveMemberMessage = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MemberSentMessageEvent),
      delay(300),
      map(
        (event) =>
          new LogMemberMessageCommand(
            event.chat.id,
            event.message.id,
            event.member.id,
            event.message.text,
            event.message.date,
            event.message.replyToMessageId,
          ),
      ),
    );
  };
}
