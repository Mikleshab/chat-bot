import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { Telegram } from 'telegraf/src/core/types/typegram';

export interface TelegramBotSender {
  sendMessage: (
    chatId: number,
    text: string,
    extra?: ExtraReplyMessage,
  ) => Promise<ReturnType<Telegram['sendMessage']>>;
}
