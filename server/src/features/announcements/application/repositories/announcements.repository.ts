import { Announcement } from '@features/announcements/domain/model/announcement';

export abstract class AnnouncementsRepository {
  abstract create(data: Partial<Omit<Announcement, 'id'>>): Promise<void>;

  abstract getOneById(id: Announcement['id'], chatId: Announcement['chatId']): Promise<Announcement>;

  abstract getAll(chatId: Announcement['chatId']): Promise<Announcement[]>;

  abstract update(
    id: Announcement['id'],
    chatId: Announcement['chatId'],
    data: Partial<Pick<Announcement, 'title' | 'text'>>,
  ): Promise<void>;

  abstract deleteById(id: Announcement['id'], chatId: Announcement['chatId']): Promise<void>;
}
