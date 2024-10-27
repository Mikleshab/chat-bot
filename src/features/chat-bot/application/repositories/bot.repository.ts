import { Message } from '@features/chat-bot/domain/models/message';

export abstract class BotRepository {
  abstract launch(): void;

  abstract stop(): void;

  abstract send(chatId: number, message: Message | string, replyToMessageId?: number | null): Promise<Message>;

  abstract update(update: unknown): Promise<void>;
}
