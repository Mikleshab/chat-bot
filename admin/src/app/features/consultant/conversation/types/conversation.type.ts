import { GetConversationQuery } from "../../../../graphql/generated";

export type Conversation = GetConversationQuery["getConversation"];

export type Message = Conversation["messages"][0];

export type ClientId = Conversation["client"]["userId"];
