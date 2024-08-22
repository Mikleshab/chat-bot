import { TelegramBotService } from './telegram-bot.service';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';
import { Telegram } from 'telegraf/src/core/types/typegram';

export class BotSenderService implements TelegramBotSender {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  async sendMessage(
    chatId: number,
    text: string,
    extra?: ExtraReplyMessage,
  ): Promise<ReturnType<Telegram['sendMessage']>> {
    return await this.telegramBotService.bot.telegram.sendMessage(chatId, text, extra);
  }
}
