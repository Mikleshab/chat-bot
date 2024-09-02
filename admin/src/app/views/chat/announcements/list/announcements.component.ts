import { Component } from '@angular/core';
import { AnnouncementsModule } from "../../../../features/chat/components/announcements/announcements.module";

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [
    AnnouncementsModule
  ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss'
})
export class AnnouncementsComponent {

}
