import { Component, Input } from "@angular/core";
import { ConversationInfoComponent } from "../../../features/consultant/conversation-info/conversation-info.component";
import { ConversationComponent } from "../../../features/consultant/conversation/conversation.component";
import { ColComponent, RowComponent } from "@coreui/angular";
import { parseInt } from "lodash-es";

@Component({
  selector: "app-client",
  standalone: true,
  imports: [
    ConversationInfoComponent,
    ConversationComponent,
    RowComponent,
    ColComponent
  ],
  templateUrl: "./client.component.html",
  styleUrl: "./client.component.scss"
})
export class ClientComponent {
  @Input({ required: true, transform: (value: string) => parseInt(value) }) clientId!: number;
}
