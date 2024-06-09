import { Injectable } from '@nestjs/common';
import { ChatBotRepository } from './ports/chat-bot.repository';
import { SurveyCommand, WelcomeCommand } from './commands';
import { Survey, Welcome } from '../domain';

@Injectable()
export class ChatBotService {
  constructor(
    private readonly chatBotRepository: ChatBotRepository,
  ) {}

  async survey(command: SurveyCommand): Promise<Survey> {
    const formInfo = await this.chatBotRepository.getFormLink();

    return new Survey(command.clientId, formInfo.title, formInfo.url);
  }

  async welcome(command: WelcomeCommand): Promise<Welcome> {
    const lines = await this.chatBotRepository.getWelcomeText();

    return new Welcome(command.name, lines);
  }
}
