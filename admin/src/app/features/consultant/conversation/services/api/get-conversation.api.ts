import { inject, Injectable } from "@angular/core";
import { merge, startWith, switchMap } from "rxjs";
import { GetConversationGQL } from "../../../../../graphql/generated";
import { filter, map, shareReplay } from "rxjs/operators";
import { ConversationUpdatedWss } from "./conversation-updated.wss";
import { CLIENT_ID } from "../../providers/conversation-client.provider";


@Injectable()
export class GetConversationApi {
  private readonly clientId$ = inject(CLIENT_ID);
  private readonly getConversationGQL = inject(GetConversationGQL);
  private readonly wss = inject(ConversationUpdatedWss);
  private readonly result$ = this.wss.data$.pipe(
    startWith(null),
    switchMap(() => this.clientId$),
    filter(Boolean),
    switchMap((clientId) =>
      this.getConversationGQL
        .watch({ input: { clientId } }, { fetchPolicy: "cache-and-network", errorPolicy: "all" })
        .valueChanges
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );


  readonly loading$ = this.result$.pipe(
    startWith({ loading: true }),
    map(({ loading }) => loading)
  );

  readonly errors$ = merge(
    this.result$.pipe(
      map(({ errors }) => errors)
    ),
    this.wss.errors$
  );

  readonly data$ = this.result$.pipe(
    map(({ data }) => data.getConversation)
  );
}