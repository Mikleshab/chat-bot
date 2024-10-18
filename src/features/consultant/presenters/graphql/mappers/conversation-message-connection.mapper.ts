import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { MessageConnection } from '@features/consultant/presenters/graphql/dto/message-connection.object';
import { ConversationMessageEdgeMapper } from '@features/consultant/presenters/graphql/mappers/conversation-message-edge.mapper';
import { PageInfo } from '@features/consultant/presenters/graphql/dto/page-info.object';

export class ConversationMessageConnectionMapper {
  static toObjectType(
    replies: ConversationMessage[],
    pageInfo: {
      first?: number;
      after?: string;
    },
  ): MessageConnection {
    const first = pageInfo.first || 10;
    const hasNextPage = replies.length === first;
    const startCursor = replies.length > 0 ? replies[0].timestamp.toString() : null;
    const endCursor = replies.length > 0 ? replies[replies.length - 1].timestamp.toString() : null;

    return new MessageConnection(
      replies.map(ConversationMessageEdgeMapper.toObjectType),
      new PageInfo(hasNextPage, !!pageInfo.after, startCursor, endCursor),
    );
  }
}
