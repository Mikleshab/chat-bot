import { ICommand } from '@nestjs/cqrs';
import { ChatEvent } from '../../domain/model/chat-event';

export class AddChatEventCommand implements ICommand {
  constructor(
    public readonly chatId: ChatEvent['chatId'],
    public readonly eventType: ChatEvent['eventType'],
    public readonly announcementId: ChatEvent['announcementId'],
  ) {}
}
