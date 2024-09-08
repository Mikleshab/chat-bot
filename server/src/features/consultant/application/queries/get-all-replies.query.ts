import { IQuery } from '@nestjs/cqrs';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';

export class GetAllRepliesQuery implements IQuery {
  constructor(
    public readonly messageId: ConversationMessage['replyToMessageId'],
    public readonly pageInfo: { after?: string; first?: number },
  ) {}
}
