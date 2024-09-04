import { Component, inject, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ChatEventCreateData } from "../../types/chat-event.type";
import { EmbedComponentInterface } from "../../../../../../common/components/modal-card/embedded-component.interface";
import { EMPTY, Observable, of } from "rxjs";
import { Announcement } from "../../../announcements/types/announcement.type";

@Component({
  selector: "chat-event-add--modal",
  templateUrl: "./chat-event-add-modal.component.html",
  styleUrl: "./chat-event-add-modal.component.scss"
})
export class ChatEventAddModalComponent implements EmbedComponentInterface<ChatEventCreateData> {
  private readonly formBuilder = inject(FormBuilder);

  @Input() announcements: Announcement[] = [];

  readonly form = this.formBuilder.group({
    eventType: this.formBuilder.nonNullable.control<ChatEventCreateData["eventType"]>("", [Validators.required]),
    announcementId: this.formBuilder.nonNullable.control<ChatEventCreateData["announcementId"]>("", [Validators.required])
  });

  close(): Observable<ChatEventCreateData> {
    if (this.form.valid) {
      const data = this.form.getRawValue() as ChatEventCreateData;
      this.form.reset(data);

      return of(data);
    }

    return EMPTY;
  }
}
