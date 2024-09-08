import { Injectable } from '@nestjs/common';
import { BotRepository } from '../../application/repositories/bot.repository';
import { Chat } from '../models/chat';
import { Message } from '@features/chat-bot/domain/models/message';

@Injectable()
export class Bot {
  constructor(private readonly repository: BotRepository) {}

  start() {
    this.repository.launch({ production: false });
  }

  stop() {
    this.repository.stop();
  }

  async send(chatId: Chat['id'], message: Message | string, replyToMessageId?: number | null): Promise<Message> {
    return this.repository.send(chatId, message, replyToMessageId);
  }
}
