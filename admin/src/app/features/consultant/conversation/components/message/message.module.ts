import { NgModule } from "@angular/core";
import { AsyncPipe, DatePipe } from "@angular/common";
import { ErrorsComponent } from "../../../../../common/components/errors/errors.component";
import { ToggleInputComponent } from "../../../../../common/components/toggle-input/toggle-input.component";
import { TextareaInputComponent } from "../../../../../common/components/textarea-input/textarea-input.component";
import {
  AlertComponent,
  BadgeComponent,
  ButtonDirective,
  ColComponent,
  ContainerComponent,
  RowComponent,
  SpinnerComponent
} from "@coreui/angular";
import { IsNewQuestionPipe } from "./pipes/is-new-question.pipe";
import { CustomPluralPipe } from "../../../../../common/pipes/custom-plural.pipe";
import { IconDirective } from "@coreui/icons-angular";
import { MessageRepliesComponent } from "./components/message-replies/message-replies.component";
import { MessageReplyComponent } from "./components/message-reply/message-reply.component";
import { MessageActionsComponent } from "./components/message-actions/message-actions.component";
import { MessageAuthorComponent } from "./components/message-author/message-author.component";
import { MessageTextComponent } from "./components/message-text/message-text.component";
import { MessageComponent } from "./components/message/message.component";
import { TimeAgoPipe } from "../../../../../common/pipes/time-ago.pipe";


@NgModule({
  declarations: [
    MessageComponent,
    MessageAuthorComponent,
    MessageActionsComponent,
    MessageTextComponent,
    MessageReplyComponent,
    MessageRepliesComponent
  ],
  exports: [
    MessageComponent
  ],
  imports: [
    ErrorsComponent,
    ToggleInputComponent,
    TextareaInputComponent,
    IsNewQuestionPipe,
    CustomPluralPipe,

    ContainerComponent,
    RowComponent,
    ColComponent,
    BadgeComponent,
    DatePipe,
    IconDirective,
    AsyncPipe,
    ButtonDirective,
    SpinnerComponent,
    AlertComponent,
    TimeAgoPipe
  ]
})
export class MessageModule {
}
