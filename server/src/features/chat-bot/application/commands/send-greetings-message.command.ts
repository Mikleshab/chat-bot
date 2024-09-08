import { ICommand } from '@nestjs/cqrs';
import { Chat } from '@features/chat-bot/domain/models/chat';

export class SendGreetingsMessageCommand implements ICommand {
  constructor(public readonly chatId: Chat['id']) {}
}
