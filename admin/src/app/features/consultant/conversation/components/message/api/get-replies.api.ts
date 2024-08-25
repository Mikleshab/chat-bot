import { inject, Injectable } from "@angular/core";
import { of, switchMap } from "rxjs";
import { GetRepliesGQL } from "../../../../../../graphql/generated";
import { filter, shareReplay, take } from "rxjs/operators";
import { MESSAGE } from "../providers/message.provider";

@Injectable()
export class GetRepliesApi {
  private static itemsPerPage = 10;
  private readonly target$ = inject(MESSAGE);
  private readonly getRepliesGQL = inject(GetRepliesGQL);

  repliesRef$ = this.target$.pipe(
    filter(Boolean),
    take(1),
    switchMap((message) => {
      return of(this.getRepliesGQL.watch({
        messageId: message.id,
        first: GetRepliesApi.itemsPerPage
      }));
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}