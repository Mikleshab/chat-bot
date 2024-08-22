import { Injectable } from "@angular/core";
import { catchError, filter, finalize, map, switchMap, tap } from "rxjs/operators";
import { QueryRef } from "apollo-angular";
import { CreateReplyGQL, GetRepliesGQL, GetRepliesQuery, GetRepliesQueryVariables } from "../../../../graphql/generated";
import { EMPTY, Observable, of } from "rxjs";
import { Message } from "../../conversation/conversation.type";
import { fromPromise } from "@apollo/client/core";

type ReplyNode = GetRepliesQuery["getReplies"]["edges"][0]["node"]

@Injectable()
export class ReplyService {
  repliesRef: QueryRef<GetRepliesQuery, GetRepliesQueryVariables> | undefined;
  replies$!: Observable<ReplyNode[]>;
  itemsPerPage = 10;
  cursor: string | null | undefined;
  hasNextPage = false;
  isLoading = false;
  isSending = false;
  repliesLoadError: string | null = null;
  replySentError: string | null = null;

  constructor(
    private readonly getRepliesGQL: GetRepliesGQL,
    private readonly createReplyGQL: CreateReplyGQL
  ) {}

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

  sendReply(message: Message, content: string, clientId: string) {
    this.isSending = true;
    this.replySentError = null;

    return this.createReplyGQL
      .mutate({
        input: {
          parentId: message.id,
          content,
          clientId
        }
      }).pipe(
        catchError((result) => {
          this.replySentError = result.graphQLErrors?.[0]?.extensions?.originalError.message.join("\n");

          return EMPTY;
        }),
        finalize(() => {
          this.isSending = false;
        })
      );
  }

  refetch(message: Message) {
    return of(this.repliesRef).pipe(
      filter(Boolean),
      switchMap((ref) => fromPromise(ref.refetch({ messageId: message.id, first: this.itemsPerPage })))
    );
  }
}
