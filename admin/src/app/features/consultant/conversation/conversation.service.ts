import { inject, Injectable } from "@angular/core";
import { GetConversationApi } from "./services/api/get-conversation.api";

@Injectable()
export class ConversationService {
  private readonly api = inject(GetConversationApi);

  readonly errors$ = this.api.errors$;
  readonly loading$ = this.api.loading$;
  readonly data$ = this.api.data$;
}