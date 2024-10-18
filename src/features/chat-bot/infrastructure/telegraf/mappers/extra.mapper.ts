import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { Message } from '@features/chat-bot/domain/models/message';

export class ExtraMapper {
  static toExtra(replyToMessageId: Message['replyToMessageId']): ExtraReplyMessage {
    const reply_parameters = replyToMessageId ? { message_id: replyToMessageId } : undefined;

    return {
      reply_parameters,
    };
  }
}
