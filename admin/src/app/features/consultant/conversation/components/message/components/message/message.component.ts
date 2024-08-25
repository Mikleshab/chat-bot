import { Component, inject, Input } from "@angular/core";
import { Message } from "../../../../types/conversation.type";
import { MessageService } from "../../message.service";
import { MESSAGE_PROVIDER } from "../../providers/message.provider";
import { GetMessageApi } from "../../api/get-message.api";
import { MessageUpdatedWss } from "../../api/message-updated.wss";


@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrl: "./message.component.scss",
  providers: [MessageService, MESSAGE_PROVIDER, GetMessageApi, MessageUpdatedWss]
})
export class MessageComponent {
  readonly feature = inject(MessageService);

  @Input({ required: true }) set message(message: Message) {
    this.feature.target.next(message);
  };
}
