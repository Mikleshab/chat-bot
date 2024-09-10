import { inject, Injectable } from "@angular/core";
import { CHAT_ID } from "src/app/core/providers/chat-id.provider";
import { GetAnnouncementGQL } from "src/app/graphql/generated";
import { Announcement } from "../types/announcement.type";


@Injectable()
export class GetAnnouncementApi {
  private readonly chatId = inject(CHAT_ID);
  private readonly getAnnouncementGQL = inject(GetAnnouncementGQL);

  getById(id: Announcement["id"]) {
    return this.getAnnouncementGQL.watch({
      input: { id, chatId: this.chatId.getValue()! }
    }, { errorPolicy: "all" }).valueChanges;
  }
}