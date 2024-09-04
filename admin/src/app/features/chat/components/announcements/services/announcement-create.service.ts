import { inject, Injectable } from "@angular/core";
import { CreateAnnouncementApi } from "./create.api";
import { AnnouncementCreateData } from "../types/announcement.type";

@Injectable()
export class AnnouncementCreateService {
  private readonly api = inject(CreateAnnouncementApi);

  readonly errors$ = this.api.errors$;
  readonly loading$ = this.api.loading$;
  readonly complete$ = this.api.complete$;

  create(data: AnnouncementCreateData) {
    this.api.create(data);
  }
}
