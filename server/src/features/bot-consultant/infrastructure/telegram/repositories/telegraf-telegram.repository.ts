import { TelegramRepository } from '@features/bot-consultant/application/ports/telegram.repository';
import { Inject } from '@nestjs/common';
import { BOT_SENDER } from '@libs/telegram-bot/telegram-bot.module';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { UserDomain } from '@features/bot-consultant/domain/user.domain';
import { Notification } from '@features/bot-consultant/domain/value-objects/notification';
import { MessageMapper } from '@features/bot-consultant/infrastructure/telegram/mappers/message.mapper';
import { Conversation } from '@features/bot-consultant/domain/value-objects/conversation';

export class TelegrafTelegramRepository implements TelegramRepository {
  constructor(@Inject(BOT_SENDER) private readonly sender: TelegramBotSender) {}

  async sendMessage(
    user: UserDomain,
    notification: Notification,
    clientId: Conversation['client']['userId'],
    replyToMessageId: MessageDomain['replyToMessageId'],
  ): Promise<MessageDomain> {
    const reply_parameters = replyToMessageId ? { message_id: replyToMessageId } : undefined;

    const result = await this.sender.sendMessage(clientId, notification.toTelegramText(), {
      reply_parameters,
    });

    return MessageMapper.toDomain(result.message_id, replyToMessageId, result.date, notification, user);
  }
}
