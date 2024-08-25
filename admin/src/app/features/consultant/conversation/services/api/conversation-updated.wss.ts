import { inject, Injectable } from "@angular/core";
import { switchMap } from "rxjs";
import { OnConversationUpdatedGQL } from "../../../../../graphql/generated";
import { filter, map, shareReplay } from "rxjs/operators";
import { CLIENT_ID } from "../../providers/conversation-client.provider";


@Injectable()
export class ConversationUpdatedWss {
  private readonly clientId$ = inject(CLIENT_ID);
  private readonly conversationUpdatedGQL = inject(OnConversationUpdatedGQL);
  private readonly result$ = this.clientId$.pipe(
    filter(Boolean),
    switchMap((clientId) => this.conversationUpdatedGQL
      .subscribe({ input: { clientId } }, { errorPolicy: "all" })),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly errors$ = this.result$.pipe(
    map(({ errors }) => errors)
  );

  readonly data$ = this.result$.pipe(
    map(({ data }) => data?.ConversationUpdatedEvent.client.userId)
  );
}