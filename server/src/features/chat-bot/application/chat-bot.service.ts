import { Injectable } from '@nestjs/common';
import { ChatBotRepository } from './ports/chat-bot.repository';
import { WelcomeCommand } from './commands';

@Injectable()
export class ChatBotService {
  constructor(
    private readonly chatBotRepository: ChatBotRepository,
  ) {}

  async welcome(command: WelcomeCommand): Promise<string> {
    const text = await this.chatBotRepository.welcome();
    const [firstLine, secondLine] = text;

    return `${firstLine}, ${command.name}.\n${secondLine}`;
  }
}
