import { inject, Injectable } from "@angular/core";
import { GetAnnouncementGQL } from "../../../../../graphql/generated";
import { Announcement } from "../types/announcement.type";


@Injectable()
export class GetAnnouncementApi {
  private readonly getAnnouncementGQL = inject(GetAnnouncementGQL);

  getById(id: Announcement["id"]) {
    return this.getAnnouncementGQL.watch({
      input: { id }
    }, { errorPolicy: "all" }).valueChanges;
  }
}