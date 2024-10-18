import { Chat } from '@features/chat/domain/models/chat';

export abstract class ChatRepository {
  abstract getAll(): Promise<Chat[]>;
}
