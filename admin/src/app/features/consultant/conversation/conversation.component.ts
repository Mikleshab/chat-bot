import { Component, DestroyRef, inject, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AlertComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  TableDirective
} from "@coreui/angular";
import { MessageComponent } from "../message/message.component";
import { Observable, startWith, switchMap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  GetConversationQuestionsGQL,
  GetConversationQuestionsQuery,
  OnConversationUpdatedGQL
} from "../../../graphql/generated";
import { ConversationInfo } from "../conversation-info/conversation-info.type";
import { ApolloQueryResult } from "@apollo/client/core";

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
    MessageComponent,
    AlertComponent
  ],
  templateUrl: "./conversation.component.html",
  styleUrls: ["./conversation.component.scss"]
})
export class ConversationComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  result$?: Observable<ApolloQueryResult<GetConversationQuestionsQuery>>;

  @Input({ required: true }) clientId!: ConversationInfo["client"]["userId"];

  constructor(
    private readonly getConversationGQL: GetConversationQuestionsGQL,
    private readonly conversationUpdatedGQL: OnConversationUpdatedGQL
  ) {}

  ngOnInit() {
    this.initializeConversation();
  }

  private initializeConversation(): void {
    this.result$ = this.conversationUpdatedGQL
      .subscribe({ input: { clientId: this.clientId } })
      .pipe(
        startWith(null),
        switchMap(() =>
          this.getConversationGQL
            .watch({ input: { clientId: this.clientId } }, { fetchPolicy: "no-cache", errorPolicy: "all" })
            .valueChanges
        ),
        takeUntilDestroyed(this.destroyRef)
      );
  }
}
