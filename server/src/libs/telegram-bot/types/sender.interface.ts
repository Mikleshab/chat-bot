import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';

export interface TelegramBotSender {
  sendMessage: (chatId: number, text: string, extra?: ExtraReplyMessage) => void;
}
