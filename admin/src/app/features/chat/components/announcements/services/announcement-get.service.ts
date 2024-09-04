import { inject, Injectable } from "@angular/core";
import { GetAnnouncementApi } from "./get.api";
import { Announcement } from "../types/announcement.type";
import { map } from "rxjs/operators";

@Injectable()
export class AnnouncementGetService {
  private readonly api = inject(GetAnnouncementApi);

  byId$(id: Announcement["id"]) {
    return this.api.getById(id).pipe(
      map(({ data }) => data.getAnnouncement)
    );
  }
}
