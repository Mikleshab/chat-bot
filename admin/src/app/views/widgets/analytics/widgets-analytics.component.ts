import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ColComponent, RowComponent } from "@coreui/angular";
import { ChatMembersAnalyticsComponent } from "src/app/features/analytics/members/chat-members-analytics.component";
import { ChatMessagesAnalyticsComponent } from "src/app/features/analytics/messages/chat-messages-analytics.component";

@Component({
  selector: "app-widgets-analytics",
  templateUrl: "./widgets-analytics.component.html",
  styleUrls: ["./widgets-analytics.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    ChatMessagesAnalyticsComponent,
    ChatMembersAnalyticsComponent,
    RowComponent,
    ColComponent
  ]
})
export class WidgetsAnalyticsComponent {
}
