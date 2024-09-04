import { inject, Injectable } from "@angular/core";
import { AnnouncementsGetAllService } from "./announcements-get-all.service";
import { AnnouncementDeleteService } from "./announcement-delete.service";
import { AnnouncementCreateService } from "./announcement-create.service";
import { AnnouncementGetService } from "./announcement-get.service";
import { AnnouncementUpdateService } from "./announcement-update.service";

@Injectable()
export class AnnouncementsListService {
  readonly list = inject(AnnouncementsGetAllService);
  readonly delete = inject(AnnouncementDeleteService);
  readonly create = inject(AnnouncementCreateService);
  readonly get = inject(AnnouncementGetService);
  readonly update = inject(AnnouncementUpdateService);
}
