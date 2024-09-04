import { Component } from "@angular/core";
import { EventsModule } from "../../../features/chat/components/events/events.module";

@Component({
  selector: "events",
  standalone: true,
  imports: [EventsModule],
  templateUrl: "./events.component.html",
  styleUrl: "./events.component.scss"
})
export class EventsComponent {
}
