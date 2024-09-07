import { Component, inject, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { EMPTY, Observable, of } from "rxjs";
import { DateTime } from "luxon";
import { ChatEventCreateData } from "../../types/chat-event.type";
import { EmbedComponentInterface } from "../../../../../../common/components/modal-card/embedded-component.interface";
import { Announcement } from "../../../announcements/types/announcement.type";
import { FrequencyType } from "../../../../../../graphql/generated";
import { endDateValidator } from "./validtors/end-date-after-start-date.validator";

@Component({
  selector: "chat-event-add--modal",
  templateUrl: "./chat-event-add-modal.component.html",
  styleUrl: "./chat-event-add-modal.component.scss"
})
export class ChatEventAddModalComponent implements EmbedComponentInterface<ChatEventCreateData> {
  private readonly formBuilder = inject(FormBuilder);

  FrequencyType = FrequencyType;

  @Input() announcements: Announcement[] = [];

  readonly eventForm = this.formBuilder.group({
    title: this.formBuilder.nonNullable.control<ChatEventCreateData["title"]>("", [Validators.required]),
    announcementId: this.formBuilder.nonNullable.control<ChatEventCreateData["announcementId"]>("", [Validators.required])
  });

  readonly eventOptionsForm = this.formBuilder.group({
    frequencyType: this.formBuilder.nonNullable.control<ChatEventCreateData["eventOptions"]["frequencyType"]>(FrequencyType.Hourly, [Validators.required]),
    interval: this.formBuilder.nonNullable.control<ChatEventCreateData["eventOptions"]["interval"]>(1, [Validators.required]),
    startDate: this.formBuilder.nonNullable.control<ChatEventCreateData["eventOptions"]["startDate"]>(this.formatDateForInput(new Date()), [Validators.required]),
    endDate: this.formBuilder.nonNullable.control<ChatEventCreateData["eventOptions"]["endDate"]>(null, [endDateValidator("startDate")])
  });

  close(): Observable<ChatEventCreateData> {
    if (this.eventForm.valid && this.eventOptionsForm.valid) {
      const eventData = this.eventForm.getRawValue() as Omit<ChatEventCreateData, "eventOptions">;
      const eventOptionsData = this.eventOptionsForm.getRawValue() as ChatEventCreateData["eventOptions"];
      this.eventForm.reset();

      return of({ ...eventData, eventOptions: eventOptionsData });
    }

    return EMPTY;
  }

  private formatDateForInput(date: Date): string {
    return DateTime.fromJSDate(date).toFormat("yyyy-LL-dd'T'HH:mm");
  }
}
