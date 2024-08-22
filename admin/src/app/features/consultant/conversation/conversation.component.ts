import { Component, DestroyRef, inject, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  TableDirective
} from "@coreui/angular";
import { MessageComponent } from "../message/message.component";
import { Observable, startWith, switchMap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { GetConversationQuestionsGQL, OnConversationUpdatedGQL } from "../../../graphql/generated";
import { map } from "rxjs/operators";
import { Conversation } from "./conversation.type";

@Component({
  selector: "app-conversation",
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TableDirective,
    ButtonDirective,
    MessageComponent
  ],
  templateUrl: "./conversation.component.html",
  styleUrls: ["./conversation.component.scss"]
})
export class ConversationComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  conversation$?: Observable<Conversation>;

  @Input({ required: true }) clientId!: string;

  constructor(
    private readonly getConversationGQL: GetConversationQuestionsGQL,
    private readonly conversationUpdatedGQL: OnConversationUpdatedGQL
  ) {}

  ngOnInit() {
    this.initializeConversation();
  }

  private initializeConversation(): void {
    this.conversation$ = this.conversationUpdatedGQL
      .subscribe({ input: { clientId: this.clientId } })
      .pipe(
        startWith(null),
        switchMap(() =>
          this.getConversationGQL
            .watch({ input: { clientId: this.clientId } }, { fetchPolicy: "no-cache" })
            .valueChanges.pipe(
            map(({ data }) => data.getConversation)
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      );
  }
}
