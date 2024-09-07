import { Component } from "@angular/core";
import {
  AvatarComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ProgressComponent,
  RowComponent,
  TableDirective
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { RouterLink } from "@angular/router";
import { map } from "rxjs/operators";
import { GetConversationsGQL } from "../../../graphql/generated";
import { AsyncPipe, DatePipe } from "@angular/common";
import { TimeAgoPipe } from "../../../common/pipes/time-ago.pipe";

@Component({
  selector: "app-conversations",
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    TableDirective,
    AvatarComponent,
    IconDirective,
    ProgressComponent,
    CardHeaderComponent,
    RouterLink,
    AsyncPipe,
    DatePipe,
    TimeAgoPipe
  ],
  templateUrl: "./conversations.component.html",
  styleUrl: "./conversations.component.scss"
})
export class ConversationsComponent {
  conversations$ = this.getConversationsGQL
    .watch()
    .valueChanges.pipe(map(({ data }) => data.getConversations));

  constructor(
    private readonly getConversationsGQL: GetConversationsGQL
  ) {}
}
