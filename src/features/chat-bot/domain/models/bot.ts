import { BotRepository } from '@features/chat-bot/application/repositories/bot.repository';
import { Chat } from '@features/chat/domain/models/chat';
import { Message } from '@features/chat-bot/domain/models/message';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Bot {
  constructor(private readonly repository: BotRepository) {}

  start() {
    this.repository.launch();
  }

  stop() {
    this.repository.stop();
  }

  async send(chatId: Chat['id'], message: Message | string, replyToMessageId?: number | null): Promise<Message> {
    return this.repository.send(chatId, message, replyToMessageId);
  }
}
