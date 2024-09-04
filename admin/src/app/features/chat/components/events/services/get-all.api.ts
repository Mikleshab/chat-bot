import { inject, Injectable } from "@angular/core";
import { filter, startWith } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { CHAT_ID } from "../../../providers/chat-id.provider";
import { GetAllChatEventsGQL } from "../../../../../graphql/generated";


@Injectable()
export class GetAllChatEventsApi {
  private readonly chatId$ = inject(CHAT_ID);
  private readonly getAllChatEventsGQL = inject(GetAllChatEventsGQL);

  private readonly chatEventsRef = this.getAllChatEventsGQL.watch({
    input: { chatId: this.chatId$.getValue()! }
  }, { errorPolicy: "all" });

  private readonly result$ = this.chatEventsRef.valueChanges.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly loading$ = this.result$.pipe(
    startWith({ loading: true }),
    map(({ loading }) => loading)
  );

  readonly errors$ = this.result$.pipe(
    map(({ errors }) => errors?.map(error => error.message)),
    filter(Boolean)
  );

  readonly data$ = this.result$.pipe(
    map(({ data }) => data.getAllChatEvents)
  );

  refetch() {
    return this.chatEventsRef.refetch();
  }
}