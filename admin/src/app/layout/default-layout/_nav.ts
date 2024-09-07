import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Счётчики",
    url: "/dashboard",
    iconComponent: { name: "cil-speedometer" }
  },
  {
    title: true,
    name: "Консультант"
  },
  {
    name: "Беседы",
    url: "/consultant/management",
    iconComponent: { name: "cil-people" }
  },
  {
    title: true,
    name: "Группа"
  },
  {
    name: "Анонсы",
    url: "/chat/announcements",
    iconComponent: { name: "cil-flag-alt" }
  },
  {
    name: "События",
    url: "/chat/events",
    iconComponent: { name: "cil-calendar" }
  },
  {
    title: true,
    name: "Extras"
  },
  {
    name: "Pages",
    url: "/login",
    iconComponent: { name: "cil-star" },
    children: [
      {
        name: "Login",
        url: "/login",
        icon: "nav-icon-bullet"
      },
      {
        name: "Register",
        url: "/register",
        icon: "nav-icon-bullet"
      },
      {
        name: "Error 404",
        url: "/404",
        icon: "nav-icon-bullet"
      },
      {
        name: "Error 500",
        url: "/500",
        icon: "nav-icon-bullet"
      }
    ]
  },
  {
    title: true,
    name: "Links",
    class: "mt-auto"
  },
  {
    name: "Docs",
    url: "https://coreui.io/angular/docs/5.x/",
    iconComponent: { name: "cil-description" },
    attributes: { target: "_blank" }
  }
];
