import { TelegramBotService } from './telegram-bot.service';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';

export class BotSenderService implements TelegramBotSender {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  sendMessage(chatId: number, text: string, extra?: ExtraReplyMessage): void {
    this.telegramBotService.bot.telegram.sendMessage(chatId, text, extra);
  }
}
