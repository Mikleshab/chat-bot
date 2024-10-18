import { Chat } from '@features/chat/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';
import { Message } from '@features/chat-bot/domain/models/message';

export class MessageLog extends Message {
  constructor(
    public readonly id: Message['id'],
    public readonly userId: Member['id'],
    public readonly text: Message['text'],
    public readonly date: Message['date'],
    public readonly replyToMessageId: Message['replyToMessageId'],
    public readonly chatId: Chat['id'],
  ) {
    super(id, text, date, replyToMessageId);
  }
}
