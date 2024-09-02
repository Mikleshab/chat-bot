import { Component, inject } from "@angular/core";
import { AnnouncementsGetAllService } from "../../services/announcements-get-all.service";
import { Announcement } from "../../types/announcement.type";
import { AnnouncementDeleteService } from "../../services/announcement-delete.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "announcements-list",
  templateUrl: "./announcements-list.component.html",
  styleUrl: "./announcements-list.component.scss"
})
export class AnnouncementsListComponent {
  readonly list = inject(AnnouncementsGetAllService);
  readonly delete = inject(AnnouncementDeleteService);

  constructor() {
    this.delete.complete$.pipe(takeUntilDestroyed()).subscribe(() => this.list.refresh());
  }

  deleteAnnouncement(id: Announcement["id"]) {
    this.delete.delete(id);
  }
}
