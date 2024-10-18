import { ChatEvent } from '@features/events/domain/model/chat-event';
import { ICommand } from '@nestjs/cqrs';

export class RemoveChatEventCommand implements ICommand {
  constructor(
    public readonly id: ChatEvent['id'],
    public readonly chatId: ChatEvent['chatId'],
  ) {}
}
