import { Component, inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AnnouncementCreateData } from "../../types/announcement.type";
import { EmbedComponentInterface } from "../../../../../../common/components/modal-card/embedded-component.interface";
import { EMPTY, Observable, of } from "rxjs";

@Component({
  selector: "app-announcement-create-modal",
  templateUrl: "./announcement-create-modal.component.html",
  styleUrl: "./announcement-create-modal.component.scss"
})
export class AnnouncementCreateModalComponent implements EmbedComponentInterface<AnnouncementCreateData> {
  private readonly formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.group({
    title: this.formBuilder.nonNullable.control<AnnouncementCreateData["title"]>("", [Validators.required]),
    text: this.formBuilder.nonNullable.control<AnnouncementCreateData["text"]>("", [Validators.required])
  });

  close(): Observable<AnnouncementCreateData> {
    if (this.form.valid) {
      const data = this.form.getRawValue() as AnnouncementCreateData;
      this.form.reset(data);

      return of(data);
    }

    return EMPTY;
  }
}
