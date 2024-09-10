import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Консультант"
    },
    children: [
      {
        path: "",
        redirectTo: "management",
        pathMatch: "full"
      },
      {
        path: "management",
        loadComponent: () =>
          import("src/app/views/consultant/conversations/conversations-view.component").then(
            m => m.ConversationsViewComponent
          ),
        data: {
          title: "Управление"
        }
      },
      {
        path: "client/:clientId",
        loadComponent: () =>
          import("./client/client.component").then(m => m.ClientComponent),
        data: {
          title: "Клиент"
        }
      }
    ]
  }
];
