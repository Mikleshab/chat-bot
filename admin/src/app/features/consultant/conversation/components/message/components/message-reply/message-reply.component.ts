import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from "@angular/core";
import { MessageReplyService } from "./message-reply.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-message-reply",
  templateUrl: "./message-reply.component.html",
  styleUrl: "./message-reply.component.scss",
  providers: [MessageReplyService]
})
export class MessageReplyComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  readonly feature = inject(MessageReplyService);

  @Output() closeTextArea = new EventEmitter<void>();
  @Output() replySent = new EventEmitter<void>();

  ngOnInit() {
    this.feature.complete$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.closeTextArea.emit();
      this.replySent.emit();
    });
  }
}
