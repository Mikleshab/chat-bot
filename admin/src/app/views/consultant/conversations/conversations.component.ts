import { Component } from "@angular/core";
import {
  ConversationsComponent as ConversationsList
} from "../../../features/consultant/conversations/conversations.component";

@Component({
  standalone: true,
  imports: [ConversationsList],
  templateUrl: "./conversations.component.html",
  styleUrl: "./conversations.component.scss"
})
export class ConversationsComponent {
}
