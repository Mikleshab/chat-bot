import { inject, Injectable } from "@angular/core";
import { RemoveChatEventApi } from "./remove.api";
import { ChatEvent } from "../types/chat-event.type";

@Injectable()
export class ChatEventRemoveService {
  private readonly api = inject(RemoveChatEventApi);

  readonly errors$ = this.api.errors$;
  readonly loading$ = this.api.loading$;
  readonly complete$ = this.api.complete$;

  byId(id: ChatEvent["id"]) {
    this.api.remove(id);
  }
}
