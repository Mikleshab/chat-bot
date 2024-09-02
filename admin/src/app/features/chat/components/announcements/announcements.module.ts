import { NgModule } from "@angular/core";
import { AnnouncementsListComponent } from "./components/announcements-list/announcements-list.component";
import { AnnouncementCreateComponent } from "./components/announcement-create/announcement-create.component";
import { CreateAnnouncementApi } from "./services/create.api";
import { GetAllAnnouncementsApi } from "./services/get-all.api";
import { AnnouncementsGetAllService } from "./services/announcements-get-all.service";
import { AnnouncementCreateService } from "./services/announcement-create.service";
import { ErrorsComponent } from "../../../../common/components/errors/errors.component";
import {
  ButtonDirective,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  FormLabelDirective,
  FormTextDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  RowComponent,
  TableDirective
} from "@coreui/angular";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { AnnouncementFormComponent } from "./components/announcement-form/announcement-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CHAT_ID_PROVIDER } from "../../providers/chat-id.provider";
import { DeleteAnnouncementsApi } from "./services/delete.api";
import { AnnouncementDeleteService } from "./services/announcement-delete.service";


@NgModule({
  declarations: [AnnouncementsListComponent, AnnouncementCreateComponent, AnnouncementFormComponent],
  imports: [
    ErrorsComponent,
    TableDirective,
    RouterLink,
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
    RouterLinkActive,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ModalToggleDirective,
    ModalFooterComponent
  ],
  exports: [
    AnnouncementsListComponent,
    AnnouncementCreateComponent
  ],
  providers: [
    AnnouncementsGetAllService,
    AnnouncementCreateService,
    AnnouncementDeleteService,
    CreateAnnouncementApi,
    GetAllAnnouncementsApi,
    DeleteAnnouncementsApi,
    CHAT_ID_PROVIDER
  ]
})
export class AnnouncementsModule {
}
