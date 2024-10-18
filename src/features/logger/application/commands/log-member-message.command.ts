import { Chat } from '@features/chat/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';
import { Message } from '@features/chat-bot/domain/models/message';

export class LogMemberMessageCommand {
  constructor(
    public readonly chatId: Chat['id'],
    public readonly messageId: Message['id'],
    public readonly userId: Member['id'],
    public readonly text: Message['text'],
    public readonly date: Message['date'],
    public readonly replyToMessageId: Message['replyToMessageId'],
  ) {}
}
