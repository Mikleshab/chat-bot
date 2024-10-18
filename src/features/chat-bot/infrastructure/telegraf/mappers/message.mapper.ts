import { Message as TelegramMessage } from '@telegraf/types';
import { Message } from '@features/chat-bot/domain/models/message';

export class MessageMapper {
  static toDomain(message: TelegramMessage.TextMessage): Message {
    return new Message(
      message.message_id,
      message.text,
      message.date * 1000,
      message.reply_to_message?.message_id || null,
    );
  }
}
