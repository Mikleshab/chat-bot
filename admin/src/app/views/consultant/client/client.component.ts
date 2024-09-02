import { Component, inject, Input } from "@angular/core";
import { ColComponent, RowComponent } from "@coreui/angular";
import { parseInt } from "lodash-es";
import { ConversationModule } from "../../../features/consultant/conversation/conversation.module";
import {
  CLIENT_ID,
  CLIENT_ID_PROVIDER
} from "../../../features/consultant/conversation/providers/conversation-client.provider";
import { ClientId } from "../../../features/consultant/conversation/types/conversation.type";

@Component({
  selector: "app-client",
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    ConversationModule
  ],
  providers: [CLIENT_ID_PROVIDER],
  templateUrl: "./client.component.html",
  styleUrl: "./client.component.scss"
})
export class ClientComponent {
  readonly clientId$ = inject(CLIENT_ID);

  @Input({ required: true, transform: (value: string) => parseInt(value) }) set clientId(clientId: ClientId) {
    this.clientId$.next(clientId);
  };
}
