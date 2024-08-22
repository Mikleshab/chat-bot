import { Component, DestroyRef, ElementRef, inject, Input, OnInit, ViewChild } from "@angular/core";
import {
  AlertComponent,
  BadgeComponent,
  ButtonDirective,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  RowComponent,
  SpinnerComponent
} from "@coreui/angular";
import { AsyncPipe, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IconDirective } from "@coreui/icons-angular";
import { CustomPluralPipe } from "../../../common/custom-plural.pipe";
import { Message } from "../conversation/conversation.type";
import { IsNewQuestionPipe } from "./pipes/is-new-question.pipe";
import { ReplyService } from "./services/reply.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MessageService } from "./services/message.service";

@Component({
  selector: "app-message",
  standalone: true,
  imports: [
    RowComponent,
    ButtonDirective,
    FormControlDirective,
    ContainerComponent,
    ColComponent,
    DatePipe,
    FormsModule,
    IconDirective,
    CustomPluralPipe,
    SpinnerComponent,
    AlertComponent,
    BadgeComponent,
    IsNewQuestionPipe,
    AsyncPipe
  ],
  providers: [MessageService, ReplyService],
  templateUrl: "./message.component.html",
  styleUrl: "./message.component.scss"
})
export class MessageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  @ViewChild("textareaElement", { static: false, read: ElementRef }) textareaElement?: ElementRef<HTMLTextAreaElement>;

  @Input({ required: true }) set message(message: Message) {
    this.service.setMessage(message);
  };

  @Input({ required: true }) clientId!: string;

  textareaRows = 3;
  isTextareaVisible = false;
  replyContent = "";
  areRepliesVisible = false;

  constructor(readonly service: MessageService) {}

  showTextarea(): void {
    this.isTextareaVisible = true;
    setTimeout(() => this.textareaElement?.nativeElement.focus(), 0);
  }

  hideTextarea(): void {
    this.replyContent = "";
    this.isTextareaVisible = false;
  }

  adjustTextareaHeight(): void {
    const lineCount = this.replyContent.split("\n").length;
    this.textareaRows = Math.max(lineCount, 3);
  }

  toggleRepliesVisibility(message: Message): void {
    this.areRepliesVisible = !this.areRepliesVisible;

    if (this.areRepliesVisible) {
      this.service.replies.loadInitialReplies(message);
    }
  }

  send(message: Message, replyContent: string, clientId: string) {
    this.service.replies.sendReply(message, replyContent, clientId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.hideTextarea();
      if (!this.areRepliesVisible) {
        this.toggleRepliesVisibility(message);
      }
    });
  }

  ngOnInit(): void {
    this.service.subscribeOnUpdate().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
