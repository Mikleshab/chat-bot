import { inject, Injectable } from "@angular/core";
import { DeleteAnnouncementGQL } from "../../../../../graphql/generated";
import { startWith, Subject } from "rxjs";
import { filter, map, shareReplay, switchMap } from "rxjs/operators";
import { Announcement } from "../types/announcement.type";

@Injectable()
export class DeleteAnnouncementsApi {
  private readonly deleteAnnouncementGQL = inject(DeleteAnnouncementGQL);
  private readonly announcementId$ = new Subject<Announcement["id"]>();
  private readonly result$ = this.announcementId$.pipe(
    switchMap((announcementId) =>
      this.deleteAnnouncementGQL.mutate({
        input: {
          id: announcementId
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
    map(({ data }) => data?.deleteAnnouncement)
  );

  delete(id: Announcement["id"]) {
    this.announcementId$.next(id);
  }
}
