import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllRepliesQuery } from '@features/consultant/application/queries/get-all-replies.query';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { MessageRepository } from '@features/consultant/application/ports/message.repository';

@QueryHandler(GetAllRepliesQuery)
export class GetAllRepliesHandler implements IQueryHandler<GetAllRepliesQuery> {
  constructor(private readonly repository: MessageRepository) {}

  execute(query: GetAllRepliesQuery): Promise<ConversationMessage[]> {
    const { messageId, pageInfo } = query;

    return this.repository.getMessages({ replyToMessageId: messageId }, pageInfo);
  }
}
