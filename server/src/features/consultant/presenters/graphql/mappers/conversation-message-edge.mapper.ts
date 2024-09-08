import { MessageEdge } from '@features/consultant/presenters/graphql/dto/message-connection.object';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { ConversationMessageMapper } from '@features/consultant/presenters/graphql/mappers/conversation-message.mapper';

export class ConversationMessageEdgeMapper {
  static toObjectType(message: ConversationMessage): MessageEdge {
    return {
      cursor: message.timestamp.toString(),
      node: ConversationMessageMapper.toObjectType(message),
    };
  }
}
