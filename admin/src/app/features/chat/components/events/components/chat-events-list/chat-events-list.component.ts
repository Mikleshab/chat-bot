import { Component, DestroyRef, inject, ViewChild, ViewContainerRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ModalService } from "../../../../../../common/components/modal-card/modal-card.service";
import { ChatEventsListService } from "../../services/chat-events-list.service";
import { merge, switchMap } from "rxjs";
import { ChatEvent, ChatEventCreateData } from "../../types/chat-event.type";
import { ChatEventAddModalComponent } from "../chat-event-add-modal/chat-event-add-modal.component";

@Component({
  selector: "chat-events-list",
  templateUrl: "./chat-events-list.component.html",
  styleUrl: "./chat-events-list.component.scss"
})
export class ChatEventsListComponent {
  @ViewChild("modalContainer", { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  private readonly destroyRef = inject(DestroyRef);
  private readonly modal = inject(ModalService);

  readonly feature = inject(ChatEventsListService);

  constructor() {
    merge(this.feature.remove.complete$, this.feature.create.complete$)
      .pipe(takeUntilDestroyed()).subscribe(() => this.feature.list.refresh());
  }

  add() {
    this.feature.announcements.list.data$.pipe(
      switchMap((announcements) => this.modal.open<ChatEventCreateData>(
        this.viewContainerRef, ChatEventAddModalComponent, { title: "Новое событие" }, { announcements })
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((data) => {
      this.feature.create.create(data);
    });
  }

  remove(id: ChatEvent["id"]) {
    this.feature.remove.byId(id);
  }
}
