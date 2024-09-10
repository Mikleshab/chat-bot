import { inject, Injectable } from "@angular/core";
import { startWith, Subject } from "rxjs";
import { filter, map, shareReplay, switchMap } from "rxjs/operators";
import { CHAT_ID } from "src/app/core/providers/chat-id.provider";
import { AddChatEventGQL } from "src/app/graphql/generated";
import { ChatEventCreateData } from "../types/chat-event.type";

@Injectable()
export class CreateChatEventApi {
  private readonly chatId = inject(CHAT_ID);
  private readonly addChatEventGQL = inject(AddChatEventGQL);
  private readonly chatEvent$ = new Subject<ChatEventCreateData>();
  private readonly result$ = this.chatEvent$.pipe(
    switchMap(({ title, eventOptions, announcementId }) =>
      this.addChatEventGQL.mutate({
        input: {
          chatId: this.chatId.getValue()!,
          title,
          eventOptions,
          announcementId
        }
      }, { errorPolicy: "all" })
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly loading$ = this.result$.pipe(
    startWith({ loading: false }),
    map((result) => !!result.loading)
  );

  readonly errors$ = this.result$.pipe(
    map((result) => result.errors?.map(({ message }) => message)),
    filter(Boolean)
  );

  readonly complete$ = this.result$.pipe(
    map(({ data }) => data?.addChatEvent)
  );

  add(data: ChatEventCreateData) {
    this.chatEvent$.next(data);
  }
}
