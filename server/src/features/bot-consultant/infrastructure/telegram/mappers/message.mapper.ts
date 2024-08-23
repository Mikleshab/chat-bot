import { UserDomain } from '@features/bot-consultant/domain/user.domain';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { Notification } from '@features/bot-consultant/domain/value-objects/notification';

export class MessageMapper {
  static toDomain(
    telegramMessageId: MessageDomain['telegramMessageId'],
    replyToMessageId: MessageDomain['replyToMessageId'],
    date: number,
    notification: Notification,
    user: UserDomain,
  ) {
    return new MessageDomain(telegramMessageId, user, date * 1000, notification.text, replyToMessageId);
  }
}
