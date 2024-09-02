import { Component, EventEmitter, inject, Output } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AnnouncementCreateService } from "../../services/announcement-create.service";

@Component({
  selector: "app-announcement-create",
  templateUrl: "./announcement-create.component.html",
  styleUrl: "./announcement-create.component.scss"
})
export class AnnouncementCreateComponent {
  readonly feature = inject(AnnouncementCreateService);

  @Output() created = new EventEmitter<void>();

  constructor() {
    this.feature.complete$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.created.emit();
    });
  }
}
