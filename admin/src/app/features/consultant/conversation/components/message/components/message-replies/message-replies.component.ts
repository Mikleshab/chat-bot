import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { MessageRepliesService } from "./message-replies.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-message-replies",
  templateUrl: "./message-replies.component.html",
  styleUrl: "./message-replies.component.scss",
  providers: [MessageRepliesService]
})
export class MessageRepliesComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  readonly feature = inject(MessageRepliesService);

  ngOnInit() {
    this.feature.updated$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
