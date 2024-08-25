import { inject, Injectable } from "@angular/core";
import { combineLatest, startWith, Subject, switchMap } from "rxjs";
import { MessageService } from "../../message.service";
import { GetRepliesGQL } from "../../../../../../../graphql/generated";
import { filter, map, shareReplay } from "rxjs/operators";
import { GraphQLFormattedError } from "graphql";
import { MessageUpdatedWss } from "../../api/message-updated.wss";

@Injectable()
export class MessageRepliesService {
  private static itemsPerPage = 10;
  private readonly fetchMoreErrors$ = new Subject<{ errors: GraphQLFormattedError[] }>();
  private readonly parent = inject(MessageService);
  private readonly updated = inject(MessageUpdatedWss);
  private readonly getRepliesGQL = inject(GetRepliesGQL);

  private readonly repliesRef = this.getRepliesGQL.watch({
    messageId: this.parent.target.getValue()?.id!,
    first: MessageRepliesService.itemsPerPage
  }, { errorPolicy: "all" });

  private readonly result$ = this.repliesRef.valueChanges.pipe(
    switchMap(() => this.repliesRef.valueChanges),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly loading$ = this.result$.pipe(
    startWith({ loading: true }),
    map(({ loading }) => loading)
  );

  readonly errors$ = combineLatest([
    this.result$,
    this.fetchMoreErrors$
  ]).pipe(
    map(([resultErrors, fetchMoreErrors]) => {
      return [...resultErrors?.errors || [], ...fetchMoreErrors.errors].map(error => error.message);
    })
  );

  readonly pageInfo$ = this.result$.pipe(
    map(({ data }) => data.getReplies.pageInfo)
  );

  readonly data$ = this.result$.pipe(
    map(({ data }) => data.getReplies.edges.map(({ node }) => node))
  );

  readonly updated$ = this.updated.data$.pipe(
    filter((messageUpdated) => messageUpdated?.id === this.parent.target.getValue()?.id),
    switchMap(() => this.repliesRef.refetch())
  );


  loadMore(cursor?: string | null) {
    const message = this.parent.target.getValue();
    this.repliesRef?.fetchMore({
      variables: {
        messageId: message?.id,
        after: cursor
      }
    }).then((response) => {
      if (response.errors) {
        this.fetchMoreErrors$.next({ errors: [...response.errors] });
      }
    });
  }
}