import { Component, inject } from "@angular/core";
import { ConversationService } from "../../conversation.service";

@Component({
  selector: "app-conversation-info",
  templateUrl: "./conversation-info.component.html",
  styleUrls: ["./conversation-info.component.scss"]
})
export class ConversationInfoComponent {
  readonly feature = inject(ConversationService);
}
