import { Message } from '@features/chat-bot/domain/models/message';

export abstract class BotRepository {
  abstract launch({ production }: { production: boolean }): void;

  abstract stop(): void;

  abstract send(chatId: number, message: Message | string, replyToMessageId?: number | null): Promise<Message>;
}
