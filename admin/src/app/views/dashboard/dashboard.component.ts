import { Component } from "@angular/core";
import { WidgetsAnalyticsComponent } from "src/app/views/widgets/analytics/widgets-analytics.component";

@Component({
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.scss"],
  standalone: true,
  imports: [WidgetsAnalyticsComponent]
})
export class DashboardComponent {
}
