import { Component, Input, ViewChild } from "@angular/core";
import { ToggleInputComponent } from "../../../../../../../common/components/toggle-input/toggle-input.component";

@Component({
  selector: "app-message-actions",
  templateUrl: "./message-actions.component.html",
  styleUrl: "./message-actions.component.scss"
})
export class MessageActionsComponent {
  @ViewChild("textareaToggleInput", { static: false }) private readonly reply?: ToggleInputComponent;
  @ViewChild("toggleReplies", { static: false }) private readonly replies?: ToggleInputComponent;

  @Input() replyCount: number = 0;

  get replyIsVisible() {
    return !!this.reply?.value;
  }

  get repliesIsVisible() {
    return !!this.replies?.value;
  }

  toggleReply() {
    this.reply?.toggle();
  }

  openReplies() {
    this.replies?.on();
  }
}
