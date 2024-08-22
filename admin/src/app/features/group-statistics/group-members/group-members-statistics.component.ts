import { Component } from "@angular/core";
import { GetMembersStatisticsGQL } from "../../../graphql/generated";
import { map } from "rxjs/operators";
import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { ChartDataPipe } from "./pipes/chart-data.pipe";
import { ChartOptionsPipe } from "./pipes/chart-options.pipe";
import { TemplateIdDirective, WidgetStatAComponent } from "@coreui/angular";
import { ChartjsComponent } from "@coreui/angular-chartjs";
import { IconDirective } from "@coreui/icons-angular";

@Component({
  selector: "app-group-members-statistics",
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    JsonPipe,
    ChartDataPipe,
    ChartOptionsPipe,
    WidgetStatAComponent,
    TemplateIdDirective,
    ChartjsComponent,
    IconDirective
  ],
  templateUrl: "./group-members-statistics.component.html",
  styleUrl: "./group-members-statistics.component.scss"
})
export class GroupMembersStatisticsComponent {
  statistics$ = this.getMembersStatisticsGQL
    .watch()
    .valueChanges.pipe(map(({ data }) => data.getMembersStatistics));

  constructor(private getMembersStatisticsGQL: GetMembersStatisticsGQL) {}
}
