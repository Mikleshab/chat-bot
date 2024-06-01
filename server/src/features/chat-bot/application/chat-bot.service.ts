import { Injectable } from '@nestjs/common';
import { ChatBotRepository } from './ports/chat-bot.repository';

@Injectable()
export class ChatBotService {
  constructor(
    private readonly chatBotRepository: ChatBotRepository,
  ) {}

  async greetings(): Promise<void> {
    return this.chatBotRepository.greetings();
  }
}
