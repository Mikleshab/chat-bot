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
import { AsyncPipe, DatePipe, JsonPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IconDirective } from "@coreui/icons-angular";
import { CustomPluralPipe } from "../../../common/custom-plural.pipe";
import { Message } from "../conversation/conversation.type";
import { IsNewQuestionPipe } from "./pipes/is-new-question.pipe";
import { ReplyService } from "./services/reply.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MessageService } from "./services/message.service";
import { ConversationInfo } from "../conversation-info/conversation-info.type";

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
    AsyncPipe,
    JsonPipe
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

  @Input({ required: true }) clientId!: ConversationInfo["client"]["userId"];

  textareaRows = 3;
  isTextareaVisible = false;
  replyContent: Message["content"] = "";

  constructor(readonly service: MessageService) {}

  showTextarea(): void {
    this.isTextareaVisible = true;
    setTimeout(() => this.textareaElement?.nativeElement.focus(), 0);
  }

  hideTextarea(): void {
    this.isTextareaVisible = false;
  }

  adjustTextareaHeight(): void {
    const lineCount = this.replyContent.split("\n").length;
    this.textareaRows = Math.max(lineCount, 3);
  }

  send(message: Message, replyContent: Message["content"], clientId: ConversationInfo["client"]["userId"]) {
    this.service.replies.sendReply(message, replyContent, clientId);
    this.service.replies.loadInitialReplies(message);
    this.hideTextarea();
  }

  ngOnInit(): void {
    this.service.subscribeOnUpdate().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
