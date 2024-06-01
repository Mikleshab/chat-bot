import { ChatBotRepository } from '../../../../application/ports/chat-bot.repository';

export class TelegrafChatBotRepository implements ChatBotRepository {
  greetings(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
