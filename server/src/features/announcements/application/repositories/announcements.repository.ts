import { Announcement } from '@features/announcements/domain/model/announcement';

export abstract class AnnouncementsRepository {
  abstract create(data: Partial<Omit<Announcement, 'id'>>): Promise<void>;

  abstract getOneById(id: Announcement['id']): Promise<Announcement>;

  abstract getAll(chatId: Announcement['chatId']): Promise<Announcement[]>;

  abstract update(id: Announcement['id'], data: Partial<Omit<Announcement, 'id'>>): Promise<void>;

  abstract deleteById(id: Announcement['id']): Promise<void>;
}
