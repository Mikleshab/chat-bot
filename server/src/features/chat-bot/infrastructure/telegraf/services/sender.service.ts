import { BotService } from './bot.service';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { Telegram } from 'telegraf/src/core/types/typegram';

export class SenderService {
  constructor(private readonly service: BotService) {}

  async sendMessage(
    chatId: number,
    text: string,
    extra?: ExtraReplyMessage,
  ): Promise<ReturnType<Telegram['sendMessage']>> {
    return await this.service.getBot().telegram.sendMessage(chatId, text, extra);
  }
}
