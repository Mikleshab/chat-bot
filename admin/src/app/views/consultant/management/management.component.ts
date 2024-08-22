import { Component } from "@angular/core";
import { ConversationsComponent } from "../../../features/consultant/conversations/conversations.component";

@Component({
  selector: "app-management",
  standalone: true,
  imports: [ConversationsComponent],
  templateUrl: "./management.component.html",
  styleUrl: "./management.component.scss"
})
export class ManagementComponent {
}
