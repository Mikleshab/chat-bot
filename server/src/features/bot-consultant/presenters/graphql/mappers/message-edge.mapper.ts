import { MessageEdge } from '@features/bot-consultant/presenters/graphql/dto/message-connection.object';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { MessageMapper } from '@features/bot-consultant/presenters/graphql/mappers/message.mapper';

export class MessageEdgeMapper {
  static toObjectType(message: MessageDomain): MessageEdge {
    return {
      cursor: message.timestamp.toString(),
      node: MessageMapper.toObjectType(message),
    };
  }
}
