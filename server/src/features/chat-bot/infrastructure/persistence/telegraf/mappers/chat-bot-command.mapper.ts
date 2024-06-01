import { ChatBotCommand } from '../../../../domain/chat-bot-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatBotCommandMapper {
  toDomain(): ChatBotCommand {
    return new ChatBotCommand();
  }
}
