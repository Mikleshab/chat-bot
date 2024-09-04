import { Component, inject, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Announcement, AnnouncementCreateData } from "../../types/announcement.type";
import { EmbedComponentInterface } from "../../../../../../common/components/modal-card/embedded-component.interface";
import { EMPTY, Observable, of } from "rxjs";

@Component({
  selector: "app-announcement-edit-modal",
  templateUrl: "./announcement-edit-modal.component.html",
  styleUrl: "./announcement-edit-modal.component.scss"
})
export class AnnouncementEditModalComponent implements EmbedComponentInterface<AnnouncementCreateData>, OnInit {
  private readonly formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.group({
    title: this.formBuilder.nonNullable.control<AnnouncementCreateData["title"]>("", [Validators.required]),
    text: this.formBuilder.nonNullable.control<AnnouncementCreateData["text"]>("", [Validators.required])
  });

  @Input({ required: true }) announcement!: Announcement;

  ngOnInit(): void {
    if (this.announcement) {
      this.form.setValue(this.announcement);
    }
  }

  close(): Observable<AnnouncementCreateData> {
    if (this.form.valid) {
      const data = this.form.getRawValue() as AnnouncementCreateData;
      this.form.reset(data);

      return of(data);
    }

    return EMPTY;
  }
}
