import { inject, Injectable } from "@angular/core";
import { DeleteAnnouncementApi } from "./delete.api";
import { Announcement } from "../types/announcement.type";

@Injectable()
export class AnnouncementDeleteService {
  private readonly api = inject(DeleteAnnouncementApi);

  readonly errors$ = this.api.errors$;
  readonly loading$ = this.api.loading$;
  readonly complete$ = this.api.complete$;

  delete(id: Announcement["id"]) {
    this.api.delete(id);
  }
}
