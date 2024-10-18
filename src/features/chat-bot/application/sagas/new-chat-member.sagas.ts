import { SendGreetingsMessageCommand } from '@features/chat-bot/application/commands/send-greetings-message.command';
import { NewChatMemberEvent } from '@features/chat-bot/application/events/new-chat-member.event';
import { LogNewMemberCommand } from '@features/logger/application/commands/log-new-member.command';
import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { delay, mergeMap, Observable } from 'rxjs';

@Injectable()
export class NewChatMemberSagas {
  @Saga()
  memberJoined = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NewChatMemberEvent),
      delay(300),
      mergeMap((event) => [
        new SendGreetingsMessageCommand(event.chat.id),
        new LogNewMemberCommand(
          event.chat.id,
          event.member.id,
          event.member.isBot,
          event.member.username,
          event.member.firstName,
          event.member.lastName,
          event.member.country,
          event.date,
        ),
      ]),
    );
  };
}
