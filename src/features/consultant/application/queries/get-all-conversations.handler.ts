import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllConversations } from '@features/consultant/application/queries/get-all-conversations.query';
import { ConversationRepository } from '@features/consultant/application/ports/conversation.repository';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';

@QueryHandler(GetAllConversations)
export class GetAllConversationsHandler implements IQueryHandler<GetAllConversations> {
  constructor(private readonly repository: ConversationRepository) {}

  execute(query: GetAllConversations): Promise<Conversation[]> {
    const { filter } = query;

    return this.repository.getConversations(filter);
  }
}
