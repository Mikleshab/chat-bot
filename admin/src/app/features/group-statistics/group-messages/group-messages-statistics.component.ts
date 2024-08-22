import { Component } from "@angular/core";
import { GetMessagesStatisticsGQL } from "../../../graphql/generated";
import { map } from "rxjs/operators";
import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { TemplateIdDirective, WidgetStatAComponent } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { ChartjsComponent } from "@coreui/angular-chartjs";
import { ChartDataPipe } from "./pipes/chart-data.pipe";
import { ChartOptionsPipe } from "./pipes/chart-options.pipe";

@Component({
  selector: "app-group-messages-statistics",
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    JsonPipe,
    ChartDataPipe,
    ChartOptionsPipe,
    WidgetStatAComponent,
    TemplateIdDirective,
    IconDirective,
    ChartjsComponent
  ],
  templateUrl: "./group-messages-statistics.component.html",
  styleUrl: "./group-messages-statistics.component.scss"
})
export class GroupMessagesStatisticsComponent {
  statistics$ = this.getMessagesStatisticsGQL
    .watch()
    .valueChanges.pipe(map(({ data }) => data.getMessagesStatistics));

  constructor(private getMessagesStatisticsGQL: GetMessagesStatisticsGQL) {}
}
