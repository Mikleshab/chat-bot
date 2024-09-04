import { inject, Injectable } from "@angular/core";
import { ChatEventsGetAllService } from "./chat-events-get-all.service";
import { ChatEventRemoveService } from "./chat-event-remove.service";
import { ChatEventCreateService } from "./chat-event-create.service";
import { AnnouncementsListService } from "../../announcements/services/announcements-list.service";

@Injectable()
export class ChatEventsListService {
  readonly list = inject(ChatEventsGetAllService);
  readonly remove = inject(ChatEventRemoveService);
  readonly create = inject(ChatEventCreateService);

  readonly announcements = inject(AnnouncementsListService);
}
