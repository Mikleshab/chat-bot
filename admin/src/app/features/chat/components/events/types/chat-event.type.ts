import { ChatEventObject, ChatEventOptionsInput } from "../../../../../graphql/generated";


export type ChatEvent = ChatEventObject;

export type ChatEventCreateData = {
  title: ChatEvent["title"],
  eventOptions: ChatEventOptionsInput,
  announcementId: ChatEvent["announcementId"],
};

export type ChatId = ChatEvent["chatId"];

