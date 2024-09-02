import { Chat } from '../../domain/models/chat';
import { Member } from '../../domain/models/member';
import { Announcement } from '@features/chat-announcements/domain/model/announcement';

export abstract class BotRepository {
  abstract handleJoin(handler: (chat: Chat, member: Member) => void): void;

  abstract handleLeft(handler: (chat: Chat, member: Member) => void): void;

  abstract send(chatId: number, announcement: Announcement): void;
}
