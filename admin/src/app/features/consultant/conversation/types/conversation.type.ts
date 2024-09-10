import { GetConversationQuery } from "src/app/graphql/generated";

export type Conversation = GetConversationQuery["getConversation"];

export type Message = Conversation["questions"][0];

export type ClientId = Conversation["client"]["userId"];
