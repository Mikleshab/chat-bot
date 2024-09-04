import { Component, DestroyRef, inject, ViewChild, ViewContainerRef } from "@angular/core";
import { Announcement, AnnouncementCreateData } from "../../types/announcement.type";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ModalService } from "../../../../../../common/components/modal-card/modal-card.service";
import { AnnouncementCreateModalComponent } from "../announcement-create-modal/announcement-create-modal.component";
import { AnnouncementsListService } from "../../services/announcements-list.service";
import { merge, switchMap } from "rxjs";
import { AnnouncementEditModalComponent } from "../announcement-edit-modal/announcement-edit-modal.component";
import { take } from "rxjs/operators";

@Component({
  selector: "announcements-list",
  templateUrl: "./announcements-list.component.html",
  styleUrl: "./announcements-list.component.scss"
})
export class AnnouncementsListComponent {
  @ViewChild("modalContainer", { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  private readonly destroyRef = inject(DestroyRef);
  private readonly modal = inject(ModalService);

  readonly feature = inject(AnnouncementsListService);

  constructor() {
    merge(this.feature.delete.complete$, this.feature.create.complete$, this.feature.update.complete$)
      .pipe(takeUntilDestroyed()).subscribe(() => this.feature.list.refresh());
  }

  add() {
    this.modal.open<AnnouncementCreateData>(this.viewContainerRef, AnnouncementCreateModalComponent, { title: "Новый анонс" }, {})
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      this.feature.create.create(data);
    });
  }

  edit(id: Announcement["id"]) {
    this.feature.get.byId$(id)
      .pipe(
        take(1),
        switchMap(({ title, text }) => this.modal.open<AnnouncementCreateData>(
          this.viewContainerRef,
          AnnouncementEditModalComponent,
          {
            title: "Редактирование"
          },
          {
            announcement: { title, text }
          })),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((data) => {
      this.feature.update.update({
        id,
        title: data.title,
        text: data.text
      });
    });
  }

  delete(id: Announcement["id"]) {
    this.feature.delete.delete(id);
  }
}
