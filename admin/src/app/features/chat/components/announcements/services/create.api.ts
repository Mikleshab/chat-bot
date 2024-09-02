import { inject, Injectable } from "@angular/core";
import { CreateAnnouncementGQL } from "../../../../../graphql/generated";
import { startWith, Subject } from "rxjs";
import { AnnouncementForm } from "../components/announcement-form/announcement-form.component";
import { CHAT_ID } from "../../../providers/chat-id.provider";
import { filter, map, shareReplay, switchMap } from "rxjs/operators";
import { GetAllAnnouncementsApi } from "./get-all.api";

@Injectable()
export class CreateAnnouncementApi {
  private readonly chatId = inject(CHAT_ID);
  private readonly api = inject(GetAllAnnouncementsApi);
  private readonly createAnnouncementGQL = inject(CreateAnnouncementGQL);
  private readonly announcement$ = new Subject<AnnouncementForm>();
  private readonly result$ = this.announcement$.pipe(
    switchMap(({ title, text }) =>
      this.createAnnouncementGQL.mutate({
        input: {
          chatId: this.chatId.getValue()!,
          title,
          text
        }
      }, { errorPolicy: "all" })
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly loading$ = this.result$.pipe(
    startWith({ loading: false }),
    map((result) => !!result.loading)
  );

  readonly errors$ = this.result$.pipe(
    map((result) => result.errors?.map(({ message }) => message)),
    filter(Boolean)
  );

  readonly complete$ = this.result$.pipe(
    map(({ data }) => data?.createAnnouncement),
    switchMap(() => this.api.refetch())
  );

  create(data: AnnouncementForm) {
    this.announcement$.next(data);
  }
}
