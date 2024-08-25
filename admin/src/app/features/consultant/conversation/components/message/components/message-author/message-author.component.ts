import { Component, Input } from "@angular/core";
import { Message } from "../../../../types/conversation.type";

@Component({
  selector: "app-message-author",
  templateUrl: "./message-author.component.html",
  styleUrl: "./message-author.component.scss"
})
export class MessageAuthorComponent {
  @Input({ required: true }) message!: Message;
}
