import { inject, Injectable } from "@angular/core";
import { AnnouncementUpdateData } from "../types/announcement.type";
import { UpdateAnnouncementApi } from "./update.api";

@Injectable()
export class AnnouncementUpdateService {
  private readonly api = inject(UpdateAnnouncementApi);

  readonly errors$ = this.api.errors$;
  readonly loading$ = this.api.loading$;
  readonly complete$ = this.api.complete$;

  update(data: AnnouncementUpdateData) {
    this.api.update(data);
  }
}
