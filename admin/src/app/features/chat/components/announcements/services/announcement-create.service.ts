import { inject, Injectable } from "@angular/core";
import { CreateAnnouncementApi } from "./create.api";
import { AnnouncementForm } from "../components/announcement-form/announcement-form.component";

@Injectable()
export class AnnouncementCreateService {
  private readonly api = inject(CreateAnnouncementApi);

  readonly errors$ = this.api.errors$;
  readonly loading$ = this.api.loading$;
  readonly  complete$ = this.api.complete$;

  create(data: AnnouncementForm) {
    this.api.create(data);
  }
}
