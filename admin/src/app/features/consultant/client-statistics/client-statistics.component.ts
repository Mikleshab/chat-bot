import { Component, DestroyRef, inject, Input, OnInit } from "@angular/core";
import { Observable, startWith, switchMap } from "rxjs";
import { CommonModule } from "@angular/common";
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from "@coreui/angular";
import { GetConversationInfoGQL, OnConversationUpdatedGQL } from "../../../graphql/generated";
import { map } from "rxjs/operators";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Conversation } from "./client-statistics.type";

interface ClientStatistics {
  name: string;
  registrationDate: string;
  messageCount: number;
}

@Component({
  selector: "app-client-statistics",
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent
  ],
  templateUrl: "./client-statistics.component.html",
  styleUrls: ["./client-statistics.component.scss"]
})
export class ClientStatisticsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  conversation$!: Observable<Conversation>;

  @Input({ required: true }) clientId!: string;

  constructor(
    private readonly getConversationGQL: GetConversationInfoGQL,
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
