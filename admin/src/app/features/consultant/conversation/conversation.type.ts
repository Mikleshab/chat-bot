import { GetConversationQuestionsQuery } from "../../../graphql/generated";

export type Message = GetConversationQuestionsQuery["getConversation"]["messages"][0];

export type Conversation = GetConversationQuestionsQuery["getConversation"];
