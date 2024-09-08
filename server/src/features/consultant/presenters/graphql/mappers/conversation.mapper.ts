import { Conversation } from '@features/consultant/domain/value-objects/conversation';
import { ConversationObject } from '@features/consultant/presenters/graphql/dto/conversation.object';
import { UserMapper } from '@features/consultant/presenters/graphql/mappers/user.mapper';

export class ConversationMapper {
  static toObjectType(conversation: Conversation): ConversationObject {
    return new ConversationObject(
      conversation.title,
      conversation.calculateState(),
      conversation.createdAt,
      conversation.getMessagesCount(),
      conversation.getLastActivity(),
      UserMapper.toObjectType(conversation.client),
    );
  }
}
