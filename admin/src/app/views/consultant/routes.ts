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
          import("./conversations/conversations.component").then(
            m => m.ConversationsComponent
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
