import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { MessageObject } from '@features/consultant/presenters/graphql/dto/message.object';
import { UserMapper } from '@features/consultant/presenters/graphql/mappers/user.mapper';

export class ConversationMessageMapper {
  static toObjectType(message: ConversationMessage): MessageObject {
    return new MessageObject(
      message.telegramMessageId,
      UserMapper.toObjectType(message.author),
      message.timestamp,
      message.content,
      message.replyToMessageId,
      message.getReplyCount(),
    );
  }
}
