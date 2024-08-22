import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    data: {
      title: "Сообщения"
    },
    children: [
      {
        path: "",
        redirectTo: "welcome",
        pathMatch: "full"
      },
      {
        path: "welcome",
        loadComponent: () =>
          import("./welcome/welcome.component").then(m => m.WelcomeComponent),
        data: {
          title: "Приветствие"
        }
      }
    ]
  }
];
