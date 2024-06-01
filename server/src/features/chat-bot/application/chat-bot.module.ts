import { Module } from '@nestjs/common';
import { ChatBotService } from './chat-bot.service';
import { BotCommandFactory } from '../domain/factories/bot-command.factory';

@Module({
  providers: [ChatBotService, BotCommandFactory],
})
export class ChatBotModule {
}
