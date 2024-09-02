import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Announcement } from "../../types/announcement.type";

export type AnnouncementForm = Pick<Announcement, "title" | "text">

@Component({
  selector: "app-announcement-form",
  templateUrl: "./announcement-form.component.html",
  styleUrl: "./announcement-form.component.scss"
})
export class AnnouncementFormComponent {
  private readonly formBuilder = inject(FormBuilder);

  @Input() set disabled(value: boolean) {
    if (value) {
      this.form?.disable();
    } else {
      this.form?.enable();
    }
  };

  @Output() submitForm = new EventEmitter<AnnouncementForm>();

  readonly form = this.formBuilder.group({
    title: this.formBuilder.nonNullable.control<string>("", [Validators.required]),
    text: this.formBuilder.nonNullable.control<string>("", [Validators.required])
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.getRawValue() as AnnouncementForm);
      this.form.reset();
    }
  }
}
