import { NgModule } from "@angular/core";
import { AnnouncementsModule } from "./components/announcements/announcements.module";
import { EventsModule } from "./components/events/events.module";


@NgModule({
  imports: [AnnouncementsModule, EventsModule]
})
export class ChatModule {
}
