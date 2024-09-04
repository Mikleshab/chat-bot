import { inject, Injectable } from "@angular/core";
import { CreateChatEventApi } from "./create.api";
import { ChatEventCreateData } from "../types/chat-event.type";

@Injectable()
export class ChatEventCreateService {
  private readonly api = inject(CreateChatEventApi);

  readonly errors$ = this.api.errors$;
  readonly loading$ = this.api.loading$;
  readonly complete$ = this.api.complete$;

  create(data: ChatEventCreateData) {
    this.api.add(data);
  }
}
