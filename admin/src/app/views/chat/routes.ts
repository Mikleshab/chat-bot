import { Routes } from "@angular/router";
import { AnnouncementsComponent } from "./announcements/announcements.component";
import { EventsComponent } from "./events/events.component";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Чат"
    },
    children: [
      {
        path: "",
        redirectTo: "announcements",
        pathMatch: "full"
      },
      {
        path: "announcements",
        component: AnnouncementsComponent,
        data: {
          title: "Анонсы"
        }
      },
      {
        path: "events",
        component: EventsComponent,
        data: {
          title: "События"
        }
      }
    ]
  }
];
