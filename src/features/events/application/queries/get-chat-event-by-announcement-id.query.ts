import { ChatEvent } from '@features/events/domain/model/chat-event';
import { IQuery } from '@nestjs/cqrs';

export class GetChatEventByAnnouncementIdQuery implements IQuery {
  constructor(
    public readonly announcementId: ChatEvent['announcementId'],
    public readonly chatId: ChatEvent['chatId'],
  ) {}
}
