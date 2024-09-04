import { NgModule } from "@angular/core";
import { AnnouncementsListComponent } from "./components/announcements-list/announcements-list.component";
import {
  AnnouncementCreateModalComponent
} from "./components/announcement-create-modal/announcement-create-modal.component";
import { CreateAnnouncementApi } from "./services/create.api";
import { GetAllAnnouncementsApi } from "./services/get-all.api";
import { AnnouncementsGetAllService } from "./services/announcements-get-all.service";
import { AnnouncementCreateService } from "./services/announcement-create.service";
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
  FormLabelDirective,
  FormTextDirective,
  RowComponent,
  TableDirective
} from "@coreui/angular";
import { AsyncPipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CHAT_ID_PROVIDER } from "../../providers/chat-id.provider";
import { DeleteAnnouncementApi } from "./services/delete.api";
import { AnnouncementDeleteService } from "./services/announcement-delete.service";
import { AnnouncementsListService } from "./services/announcements-list.service";
import { GetAnnouncementApi } from "./services/get.api";
import { AnnouncementGetService } from "./services/announcement-get.service";
import { AnnouncementEditModalComponent } from "./components/announcement-edit-modal/announcement-edit-modal.component";
import { UpdateAnnouncementApi } from "./services/update.api";
import { AnnouncementUpdateService } from "./services/announcement-update.service";


@NgModule({
  declarations: [AnnouncementsListComponent, AnnouncementCreateModalComponent, AnnouncementEditModalComponent],
  imports: [
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
    CardHeaderComponent
  ],
  exports: [
    AnnouncementsListComponent
  ],
  providers: [
    AnnouncementsListService,
    AnnouncementsGetAllService,
    AnnouncementGetService,
    AnnouncementCreateService,
    AnnouncementDeleteService,
    AnnouncementUpdateService,
    CreateAnnouncementApi,
    GetAllAnnouncementsApi,
    GetAnnouncementApi,
    DeleteAnnouncementApi,
    UpdateAnnouncementApi,
    CHAT_ID_PROVIDER
  ]
})
export class AnnouncementsModule {
}
