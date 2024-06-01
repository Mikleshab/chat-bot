import { ExecuteCommand, } from '../../application/commands';
import { Injectable } from '@nestjs/common';
import { ChatBotCommand } from '../chat-bot-command';

@Injectable()
export class BotCommandFactory {
  forCreate(command: ExecuteCommand): ChatBotCommand {
    console.log('BotCommandFactory | command: ', command);

    return new ChatBotCommand();
  }
}
