import { ChatEventObject } from "../../../../../graphql/generated";


export type ChatEvent = ChatEventObject;

export type ChatEventCreateData = Pick<ChatEvent, "eventType" | "announcementId">;

export type ChatId = ChatEvent["chatId"];

