import { inject, Injectable } from "@angular/core";
import { startWith, Subject } from "rxjs";
import { filter, map, shareReplay, switchMap } from "rxjs/operators";
import { CHAT_ID } from "src/app/core/providers/chat-id.provider";
import { RemoveChatEventGQL } from "src/app/graphql/generated";
import { ChatEvent } from "../types/chat-event.type";

@Injectable()
export class RemoveChatEventApi {
  private readonly chatId = inject(CHAT_ID);
  private readonly removeChatEventGQL = inject(RemoveChatEventGQL);
  private readonly chatEventId$ = new Subject<ChatEvent["id"]>();
  private readonly result$ = this.chatEventId$.pipe(
    switchMap((chatEventId) =>
      this.removeChatEventGQL.mutate({
        input: { id: chatEventId, chatId: this.chatId.getValue()! }
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
    map(({ data }) => data?.removeChatEvent)
  );

  remove(id: ChatEvent["id"]) {
    this.chatEventId$.next(id);
  }
}
