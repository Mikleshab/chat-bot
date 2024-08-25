import { Component, inject } from "@angular/core";
import { ConversationService } from "../../conversation.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent {
  readonly feature = inject(ConversationService);
}
