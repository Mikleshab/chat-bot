import { inject, Injectable } from "@angular/core";
import { GetAllAnnouncementsApi } from "./get-all.api";

@Injectable()
export class AnnouncementsGetAllService {
  private readonly api = inject(GetAllAnnouncementsApi);

  readonly errors$ = this.api.errors$;
  readonly loading$ = this.api.loading$;
  readonly data$ = this.api.data$;

  refresh() {
    return this.api.refetch();
  }
}
