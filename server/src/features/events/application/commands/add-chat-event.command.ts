import { ICommand } from '@nestjs/cqrs';
import { ChatEvent } from '@features/events/domain/model/chat-event';

export class AddChatEventCommand implements ICommand {
  constructor(
    public readonly chatId: ChatEvent['chatId'],
    public readonly title: ChatEvent['title'],
    public readonly eventOptions: Omit<ChatEvent['eventOptions'], 'type' | 'system'>,
    public readonly announcementId: ChatEvent['announcementId'],
  ) {}
}
