import { inject, Injectable } from "@angular/core";
import { filter, startWith } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { CHAT_ID } from "src/app/core/providers/chat-id.provider";
import { GetAllAnnouncementsGQL } from "src/app/graphql/generated";


@Injectable()
export class GetAllAnnouncementsApi {
  private readonly chatId$ = inject(CHAT_ID);
  private readonly getAnnouncementsGQL = inject(GetAllAnnouncementsGQL);

  private readonly announcementsRef = this.getAnnouncementsGQL.watch({
    input: { chatId: this.chatId$.getValue()! }
  }, { errorPolicy: "all" });

  private readonly result$ = this.announcementsRef.valueChanges.pipe(
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
    map(({ data }) => data.getAllAnnouncements)
  );

  refetch() {
    return this.announcementsRef.refetch();
  }
}