import { AnnouncementObject } from "../../../../../graphql/generated";


export type Announcement = AnnouncementObject;

export type AnnouncementCreateData = Pick<Announcement, "title" | "text">;
export type AnnouncementUpdateData = Pick<Announcement, "id" | "title" | "text">;
