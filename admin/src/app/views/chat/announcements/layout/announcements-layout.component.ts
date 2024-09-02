import { Component } from "@angular/core";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormSelectDirective,
  RowComponent,
  TabDirective,
  TabsComponent,
  TabsListComponent
} from "@coreui/angular";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { ChatModule } from "../../../../features/chat/chat.module";

@Component({
  selector: "announcements-view",
  standalone: true,
  imports: [
    TabsComponent,
    CardComponent,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    TabsListComponent,
    TabDirective,
    CardBodyComponent,
    RouterOutlet,
    FormSelectDirective,
    ButtonDirective,
    RouterLink,
    ChatModule,
    RouterLinkActive
  ],
  templateUrl: "./announcements-layout.component.html",
  styleUrl: "./announcements-layout.component.scss"
})
export class AnnouncementsLayoutComponent {
}
