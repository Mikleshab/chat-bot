import { inject, Injectable } from "@angular/core";
import { MESSAGE } from "../providers/message.provider";
import { OnMessageUpdatedGQL } from "../../../../../../graphql/generated";
import { filter, map, shareReplay } from "rxjs/operators";
import { switchMap } from "rxjs";

@Injectable()
export class MessageUpdatedWss {
  private readonly target$ = inject(MESSAGE);
  private readonly messageUpdatedGQL = inject(OnMessageUpdatedGQL);
  private readonly result$ = this.target$.pipe(
    filter(Boolean),
    switchMap((message) => this.messageUpdatedGQL
      .subscribe({ input: { messageId: message.id } }, { errorPolicy: "all" })),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly errors$ = this.result$.pipe(
    map(({ errors }) => errors)
  );

  readonly data$ = this.result$.pipe(
    map(({ data }) => data?.MessageUpdatedEvent)
  );
}