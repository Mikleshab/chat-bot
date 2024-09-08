import { ICommand } from '@nestjs/cqrs';
import { Announcement } from '@features/announcements/domain/model/announcement';
import { Chat } from '@features/chat-bot/domain/models/chat';

export class CreateAnnouncementCommand implements ICommand {
  constructor(
    public readonly title: Announcement['title'],
    public readonly text: Announcement['text'],
    public readonly chatId: Chat['id'],
  ) {}
}
