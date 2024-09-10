import { AsyncPipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormSelectDirective,
  FormTextDirective,
  RowComponent,
  TableDirective,
  TextColorDirective
} from "@coreui/angular";
import { ErrorsComponent } from "src/app/common/components/errors/errors.component";
import { AnnouncementsModule } from "../announcements/announcements.module";
import { ChatEventAddModalComponent } from "./components/chat-event-add-modal/chat-event-add-modal.component";
import {
  ExtendedFormControlDirective
} from "./components/chat-event-add-modal/directives/extended-form-control.directive";
import { ChatEventsListComponent } from "./components/chat-events-list/chat-events-list.component";
import { ChatEventCreateService } from "./services/chat-event-create.service";
import { ChatEventRemoveService } from "./services/chat-event-remove.service";
import { ChatEventsGetAllService } from "./services/chat-events-get-all.service";
import { ChatEventsListService } from "./services/chat-events-list.service";
import { CreateChatEventApi } from "./services/create.api";
import { GetAllChatEventsApi } from "./services/get-all.api";
import { RemoveChatEventApi } from "./services/remove.api";


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
    FormSelectDirective,
    TextColorDirective,
    ExtendedFormControlDirective
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
    RemoveChatEventApi
  ]
})
export class EventsModule {
}
