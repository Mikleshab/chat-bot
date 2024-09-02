import { Component } from "@angular/core";
import { AnnouncementsModule } from "../../../../features/chat/components/announcements/announcements.module";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-edit-announcement",
  standalone: true,
  imports: [
    AnnouncementsModule
  ],
  templateUrl: "./edit-announcement.component.html",
  styleUrl: "./edit-announcement.component.scss"
})
export class EditAnnouncementComponent {
  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

  navigateToList() {
    this.router.navigate(["..", "list"], { relativeTo: this.route });
  }
}
