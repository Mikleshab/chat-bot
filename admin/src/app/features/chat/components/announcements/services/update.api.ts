import { inject, Injectable } from "@angular/core";
import { UpdateAnnouncementGQL } from "../../../../../graphql/generated";
import { startWith, Subject } from "rxjs";
import { filter, map, shareReplay, switchMap } from "rxjs/operators";
import { AnnouncementUpdateData } from "../types/announcement.type";

@Injectable()
export class UpdateAnnouncementApi {
  private readonly updateAnnouncementGQL = inject(UpdateAnnouncementGQL);
  private readonly announcement$ = new Subject<AnnouncementUpdateData>();
  private readonly result$ = this.announcement$.pipe(
    switchMap(({ id, title, text }) =>
      this.updateAnnouncementGQL.mutate({
        input: {
          id, title, text
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
    map(({ data }) => data?.updateAnnouncement)
  );

  update(data: AnnouncementUpdateData) {
    this.announcement$.next(data);
  }
}
