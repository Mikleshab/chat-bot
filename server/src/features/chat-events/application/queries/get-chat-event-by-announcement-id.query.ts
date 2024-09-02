import { IQuery } from '@nestjs/cqrs';
import { ChatEvent } from '@features/chat-events/domain/model/chat-event';

export class GetChatEventByAnnouncementIdQuery implements IQuery {
  constructor(public readonly announcementId: ChatEvent['announcementId']) {}
}
