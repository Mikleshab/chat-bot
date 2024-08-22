import { Component, Input } from "@angular/core";
import { ClientStatisticsComponent } from "../../../features/consultant/client-statistics/client-statistics.component";
import { ConversationComponent } from "../../../features/consultant/conversation/conversation.component";
import { ColComponent, RowComponent } from "@coreui/angular";

@Component({
  selector: "app-client",
  standalone: true,
  imports: [
    ClientStatisticsComponent,
    ConversationComponent,
    RowComponent,
    ColComponent
  ],
  templateUrl: "./client.component.html",
  styleUrl: "./client.component.scss"
})
export class ClientComponent {
  @Input() clientId!: string;
}
