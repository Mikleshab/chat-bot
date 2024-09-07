import { inject, Injectable } from "@angular/core";
import { merge, Observable } from "rxjs";
import { ChatEventsGetAllService } from "./chat-events-get-all.service";
import { ChatEventRemoveService } from "./chat-event-remove.service";
import { ChatEventCreateService } from "./chat-event-create.service";
import { AnnouncementsListService } from "../../announcements/services/announcements-list.service";

@Injectable()
export class ChatEventsListService {
  readonly list = inject(ChatEventsGetAllService);
  readonly remove = inject(ChatEventRemoveService);
  readonly create = inject(ChatEventCreateService);

  readonly errors$: Observable<string[]> = merge(this.list.errors$, this.create.errors$);

  readonly announcements = inject(AnnouncementsListService);
}
