import { Routes } from "@angular/router";
import { AnnouncementsLayoutComponent } from "./announcements/layout/announcements-layout.component";
import { AnnouncementsComponent } from "./announcements/list/announcements.component";
import { EditAnnouncementComponent } from "./announcements/edit/edit-announcement.component";

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
        component: AnnouncementsLayoutComponent,
        children: [
          {
            path: "",
            redirectTo: "list",
            pathMatch: "full"
          },
          {
            path: "list",
            component: AnnouncementsComponent,
            data: {
              title: "Анонсы"
            }
          },
          {
            path: "create",
            component: EditAnnouncementComponent,
            data: {
              title: "Добавить анонс"
            }
          }
        ],
        data: {
          title: "Анонсы"
        }
      }
    ]
  }
];
