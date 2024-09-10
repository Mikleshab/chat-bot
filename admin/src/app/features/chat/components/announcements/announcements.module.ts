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
  FormTextDirective,
  RowComponent,
  TableDirective
} from "@coreui/angular";
import { ErrorsComponent } from "src/app/common/components/errors/errors.component";
import {
  AnnouncementCreateModalComponent
} from "./components/announcement-create-modal/announcement-create-modal.component";
import { AnnouncementEditModalComponent } from "./components/announcement-edit-modal/announcement-edit-modal.component";
import { AnnouncementsListComponent } from "./components/announcements-list/announcements-list.component";
import { AnnouncementCreateService } from "./services/announcement-create.service";
import { AnnouncementDeleteService } from "./services/announcement-delete.service";
import { AnnouncementGetService } from "./services/announcement-get.service";
import { AnnouncementUpdateService } from "./services/announcement-update.service";
import { AnnouncementsGetAllService } from "./services/announcements-get-all.service";
import { AnnouncementsListService } from "./services/announcements-list.service";
import { CreateAnnouncementApi } from "./services/create.api";
import { DeleteAnnouncementApi } from "./services/delete.api";
import { GetAllAnnouncementsApi } from "./services/get-all.api";
import { GetAnnouncementApi } from "./services/get.api";
import { UpdateAnnouncementApi } from "./services/update.api";


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
    UpdateAnnouncementApi
  ]
})
export class AnnouncementsModule {
}
