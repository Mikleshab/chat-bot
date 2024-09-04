import { NgModule } from "@angular/core";
import { ChatEventsListComponent } from "./components/chat-events-list/chat-events-list.component";
import { CreateChatEventApi } from "./services/create.api";
import { GetAllChatEventsApi } from "./services/get-all.api";
import { ChatEventsGetAllService } from "./services/chat-events-get-all.service";
import { ChatEventCreateService } from "./services/chat-event-create.service";
import { ErrorsComponent } from "../../../../common/components/errors/errors.component";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective, FormSelectDirective,
  FormTextDirective,
  RowComponent,
  TableDirective
} from "@coreui/angular";
import { AsyncPipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CHAT_ID_PROVIDER } from "../../providers/chat-id.provider";
import { RemoveChatEventApi } from "./services/remove.api";
import { ChatEventRemoveService } from "./services/chat-event-remove.service";
import { ChatEventsListService } from "./services/chat-events-list.service";
import { ChatEventAddModalComponent } from "./components/chat-event-add-modal/chat-event-add-modal.component";
import { AnnouncementsModule } from "../announcements/announcements.module";


@NgModule({
  declarations: [ChatEventsListComponent, ChatEventAddModalComponent],
  imports: [
    AnnouncementsModule,
    ErrorsComponent,
    TableDirective,
    AsyncPipe,
    ContainerComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    FormDirective,
    ReactiveFormsModule,
    FormLabelDirective,
    FormControlDirective,
    FormTextDirective,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    FormSelectDirective
  ],
  exports: [
    ChatEventsListComponent
  ],
  providers: [
    ChatEventsListService,
    ChatEventCreateService,
    ChatEventsGetAllService,
    ChatEventRemoveService,
    CreateChatEventApi,
    GetAllChatEventsApi,
    RemoveChatEventApi,
    CHAT_ID_PROVIDER
  ]
})
export class EventsModule {
}
