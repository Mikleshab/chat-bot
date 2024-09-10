import { Component } from "@angular/core";
import { ConversationsComponent } from "src/app/features/consultant/conversations/conversations.component";

@Component({
  selector: "app-conversations-view",
  standalone: true,
  imports: [ConversationsComponent],
  templateUrl: "./conversations-view.component.html",
  styleUrl: "./conversations-view.component.scss"
})
export class ConversationsViewComponent {
}
