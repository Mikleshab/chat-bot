import { NotifyMemberAboutReceivedMessageCommand } from '@features/chat-bot/application/commands/notify-member-about-received-message.command';
import { MemberSentPrivateMessageEvent } from '@features/chat-bot/application/events/member-sent-private-message.event';
import { SaveMemberPrivateMessageCommand } from '@features/consultant/application/commands/save-member-private-message.command';
import { MemberPrivateMessageSavedEvent } from '@features/consultant/application/events/member-private-message-saved.event';
import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { delay, map, mergeMap, Observable } from 'rxjs';

@Injectable()
export class SaveMemberPrivateMessageSagas {
  @Saga()
  saveMemberPrivateMessage = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(MemberSentPrivateMessageEvent),
      delay(300),
      map((event) => new SaveMemberPrivateMessageCommand(event.member, event.message, event.chat)),
      mergeMap(() =>
        events$.pipe(
          ofType(MemberPrivateMessageSavedEvent),
          delay(300),
          map((event: MemberPrivateMessageSavedEvent) => new NotifyMemberAboutReceivedMessageCommand(event.chat)),
        ),
      ),
    );
  };
}
