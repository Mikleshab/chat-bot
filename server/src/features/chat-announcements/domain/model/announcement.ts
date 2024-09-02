import { Chat } from '@features/chat-bot/domain/models/chat';

export const DEFAULT_TEXT = `Добро пожаловать`;

export class Announcement {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly text: string,
    public readonly chatId: Chat['id'],
  ) {}
}
