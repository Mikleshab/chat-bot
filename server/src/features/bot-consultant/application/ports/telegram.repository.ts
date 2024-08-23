import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { UserDomain } from '@features/bot-consultant/domain/user.domain';
import { Notification } from '@features/bot-consultant/domain/value-objects/notification';
import { Conversation } from '@features/bot-consultant/domain/value-objects/conversation';

export abstract class TelegramRepository {
  abstract sendMessage(
    user: UserDomain,
    notification: Notification,
    clientId: Conversation['client']['userId'],
    replyToMessageId: MessageDomain['replyToMessageId'],
  ): Promise<MessageDomain>;
}
