import { Injectable } from "@angular/core";
import { catchError, filter, map, shareReplay, switchMap, tap } from "rxjs/operators";
import { QueryRef } from "apollo-angular";
import {
  CreateReplyGQL,
  GetRepliesGQL,
  GetRepliesQuery,
  GetRepliesQueryVariables
} from "../../../../graphql/generated";
import { BehaviorSubject, EMPTY, merge, Observable, of, startWith, Subject } from "rxjs";
import { Message } from "../../conversation/conversation.type";
import { fromPromise } from "@apollo/client/core";
import { ConversationInfo } from "../../conversation-info/conversation-info.type";

type ReplyNode = GetRepliesQuery["getReplies"]["edges"][0]["node"]

@Injectable()
export class ReplyService {
  private readonly reply$ = new Subject<{
    replyTo: Message,
    text: Message["content"],
    clientId: ConversationInfo["client"]["userId"]
  }>();

  private readonly sendReplyResult$ = this.reply$.pipe(
    switchMap(({ replyTo, text, clientId }) =>
      this.createReplyGQL.mutate({
        input: { parentId: replyTo.id, content: text, clientId }
      }, { errorPolicy: "all" }).pipe(
        startWith({ loading: true, errors: null, data: { createReply: false } })
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly sendReplyLoading$ = this.sendReplyResult$.pipe(
    startWith({ loading: false }),
    map((result) => !!result.loading)
  );

  readonly sendReplyErrors$ = this.sendReplyResult$.pipe(
    startWith({ errors: null }),
    map((result) => result.errors)
  );

  private readonly sendReplyComplete$ = this.sendReplyResult$.pipe(
    startWith({ data: { createReply: false } }),
    map((result) => !!result.data?.createReply)
  );

  private readonly areRepliesVisibleSubject$ = new BehaviorSubject<boolean>(false);
  readonly areRepliesVisible$ = merge(
    this.areRepliesVisibleSubject$.asObservable(),
    this.sendReplyComplete$.pipe(filter(Boolean))
  );

  repliesRef: QueryRef<GetRepliesQuery, GetRepliesQueryVariables> | undefined;
  replies$!: Observable<ReplyNode[]>;
  itemsPerPage = 10;
  cursor: string | null | undefined;
  hasNextPage = false;
  isLoading = false;
  repliesLoadError: string | null = null;

  constructor(
    private readonly getRepliesGQL: GetRepliesGQL,
    private readonly createReplyGQL: CreateReplyGQL
  ) {
  }

  loadInitialReplies(parent: Message) {
    this.isLoading = true;
    this.repliesRef = this.getRepliesGQL.watch({
      messageId: parent.id,
      first: this.itemsPerPage
    });

    this.replies$ = this.repliesRef.valueChanges.pipe(
      catchError((error) => {
        this.repliesLoadError = error?.message || null;
        return EMPTY;
      }),
      tap(result => {
        this.isLoading = result.loading;
        const { pageInfo } = result.data.getReplies;
        this.hasNextPage = pageInfo.hasNextPage;
        this.cursor = pageInfo.endCursor;
      }),
      map(result => {
        const { edges } = result.data.getReplies;
        return edges.map(edge => edge.node);
      })
    );
  }

  loadMore(parent: Message) {
    if (!this.hasNextPage || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.repliesRef?.fetchMore({
      variables: {
        messageId: parent.id,
        after: this.cursor
      }
    });
  }

  sendReply(message: Message, text: Message["content"], clientId: ConversationInfo["client"]["userId"]) {
    this.reply$.next({ replyTo: message, text, clientId });
  }

  refetch(message: Message) {
    return of(this.repliesRef).pipe(
      filter(Boolean),
      switchMap((ref) => fromPromise(ref.refetch({ messageId: message.id, first: this.itemsPerPage })))
    );
  }

  toggleReplies(message: Message) {
    const isVisible = this.areRepliesVisibleSubject$.getValue();
    this.areRepliesVisibleSubject$.next(!isVisible);

    if (!isVisible) {
      this.loadInitialReplies(message);
    }
  }
}
