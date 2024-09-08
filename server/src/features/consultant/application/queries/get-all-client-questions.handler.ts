import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllClientQuestionsQuery } from '@features/consultant/application/queries/get-all-client-questions.query';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { MessageRepository } from '@features/consultant/application/ports/message.repository';

@QueryHandler(GetAllClientQuestionsQuery)
export class GetAllClientQuestionsHandler implements IQueryHandler<GetAllClientQuestionsQuery> {
  constructor(private readonly repository: MessageRepository) {}

  execute(query: GetAllClientQuestionsQuery): Promise<ConversationMessage[]> {
    const { clientId } = query;

    return this.repository.getMessages({ authorId: clientId, replyToMessageId: null }, {});
  }
}
