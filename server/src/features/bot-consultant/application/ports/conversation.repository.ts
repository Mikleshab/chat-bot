import { Conversation } from '@features/bot-consultant/domain/value-objects/conversation';

export abstract class ConversationRepository {
  abstract getConversations(filter?: { clientIds: Conversation['client']['userId'][] }): Promise<Conversation[]>;
}
