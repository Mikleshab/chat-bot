import { Module } from '@nestjs/common';
import { ChatBotRepository } from '../../../application/ports/chat-bot.repository';
import { TelegrafChatBotRepository } from './repositories/telegraf-chat-bot.repository';
import { ChatBotCommandMapper } from './mappers/chat-bot-command.mapper';

@Module({
  providers: [
    {
      provide: ChatBotRepository,
      useClass: TelegrafChatBotRepository,
    },
    ChatBotCommandMapper,
  ],
  exports: [ChatBotRepository],
})
export class TelegrafPersistenceModule {
}
