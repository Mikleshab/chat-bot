import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { MessageObject } from '@features/bot-consultant/presenters/graphql/dto/message.object';
import { UserMapper } from '@features/bot-consultant/presenters/graphql/mappers/user.mapper';

export class MessageMapper {
  static toObjectType(message: MessageDomain): MessageObject {
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
