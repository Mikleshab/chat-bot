import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { TemplateIdDirective, WidgetStatAComponent } from "@coreui/angular";
import { ChartjsComponent } from "@coreui/angular-chartjs";
import { IconDirective } from "@coreui/icons-angular";
import { startWith } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { ErrorsComponent } from "src/app/common/components/errors/errors.component";
import { CHAT_ID } from "src/app/core/providers/chat-id.provider";
import { GetMessagesAnalyticsGQL } from "src/app/graphql/generated";
import { ChartDataPipe } from "./pipes/chart-data.pipe";
import { ChartOptionsPipe } from "./pipes/chart-options.pipe";

@Component({
  selector: "app-chat-messages-analytics",
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    JsonPipe,
    ChartDataPipe,
    ChartOptionsPipe,
    WidgetStatAComponent,
    TemplateIdDirective,
    IconDirective,
    ChartjsComponent,
    ErrorsComponent
  ],
  templateUrl: "./chat-messages-analytics.component.html",
  styleUrl: "./chat-messages-analytics.component.scss"
})
export class ChatMessagesAnalyticsComponent {
  private readonly chatId$ = inject(CHAT_ID);
  private readonly getMessagesAnalyticsGQL = inject(GetMessagesAnalyticsGQL);

  private readonly result$ = this.getMessagesAnalyticsGQL
    .watch({ input: { chatId: this.chatId$.getValue()! } }, { errorPolicy: "all" })
    .valueChanges.pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    );

  readonly loading$ = this.result$.pipe(
    startWith({ loading: true }),
    map(({ loading }) => loading)
  );

  readonly errors$ = this.result$.pipe(
    map(({ errors }) => errors?.map(error => error.message))
  );

  readonly data$ = this.result$.pipe(
    map(({ data }) => data.getMessagesAnalytics)
  );
}
