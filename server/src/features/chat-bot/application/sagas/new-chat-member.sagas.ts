import { SendGreetingsMessageCommand } from '@features/chat-bot/application/commands/send-greetings-message.command';
import { NewChatMemberEvent } from '@features/chat-bot/application/events/new-chat-member.event';
import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { delay, map, Observable } from 'rxjs';

@Injectable()
export class NewChatMemberSagas {
  @Saga()
  memberJoined = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NewChatMemberEvent),
      delay(300),
      map((event) => {
        return new SendGreetingsMessageCommand(event.chat.id);
      }),
    );
  };
}
