import { inject, Injectable } from "@angular/core";
import { GetAllChatEventsApi } from "./get-all.api";

@Injectable()
export class ChatEventsGetAllService {
  private readonly api = inject(GetAllChatEventsApi);

  readonly errors$ = this.api.errors$;
  readonly loading$ = this.api.loading$;
  readonly data$ = this.api.data$;

  refresh() {
    return this.api.refetch();
  }
}
