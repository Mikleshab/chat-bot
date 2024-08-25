import { inject, Injectable } from "@angular/core";
import { OnMessageUpdatedGQL } from "../../../../../../graphql/generated";
import { map, shareReplay } from "rxjs/operators";

@Injectable()
export class MessageUpdatedWss {
  private readonly messageUpdatedGQL = inject(OnMessageUpdatedGQL);
  private readonly result$ = this.messageUpdatedGQL
    .subscribe({}, { errorPolicy: "all" }).pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );

  readonly errors$ = this.result$.pipe(
    map(({ errors }) => errors)
  );

  readonly data$ = this.result$.pipe(
    map(({ data }) => data?.MessageUpdatedEvent)
  );
}