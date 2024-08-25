import { Component, Input } from "@angular/core";

@Component({
  selector: "app-message-text",
  templateUrl: "./message-text.component.html",
  styleUrl: "./message-text.component.scss"
})
export class MessageTextComponent {
  @Input({ required: true }) text = "";
}
