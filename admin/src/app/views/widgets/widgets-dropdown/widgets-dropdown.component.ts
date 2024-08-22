import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  GroupMessagesStatisticsComponent
} from "../../../features/group-statistics/group-messages/group-messages-statistics.component";
import {
  GroupMembersStatisticsComponent
} from "../../../features/group-statistics/group-members/group-members-statistics.component";
import { ColComponent, RowComponent } from "@coreui/angular";

@Component({
  selector: "app-widgets-dropdown",
  templateUrl: "./widgets-dropdown.component.html",
  styleUrls: ["./widgets-dropdown.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    GroupMessagesStatisticsComponent,
    GroupMembersStatisticsComponent,
    RowComponent,
    ColComponent
  ]
})
export class WidgetsDropdownComponent {
}
