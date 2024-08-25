import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AlertComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  SpinnerComponent
} from "@coreui/angular";
import { MessagesComponent } from "./components/messages/messages.component";
import { ConversationService } from "./conversation.service";
import { GetConversationApi } from "./services/api/get-conversation.api";
import { ConversationUpdatedWss } from "./services/api/conversation-updated.wss";
import { CLIENT_ID_PROVIDER } from "./providers/conversation-client.provider";
import { ConversationInfoComponent } from "./components/conversation-info/conversation-info.component";
import { MessageModule } from "./components/message/message.module";
import { TimeAgoPipe } from "../../../common/pipes/time-ago.pipe";
import { MessageUpdatedWss } from "./components/message/api/message-updated.wss";


@NgModule({
  declarations: [
    MessagesComponent,
    ConversationInfoComponent
  ],
  providers: [
    ConversationService,
    GetConversationApi,
    ConversationUpdatedWss,
    MessageUpdatedWss,
    CLIENT_ID_PROVIDER
  ],
  exports: [
    MessagesComponent,
    ConversationInfoComponent
  ],
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ButtonDirective,
    AlertComponent,
    RowComponent,
    ColComponent,
    MessageModule,
    SpinnerComponent,
    TimeAgoPipe
  ]
})
export class ConversationModule {
}
