import { Chat } from '@features/chat-bot/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';

export class LogLeftMemberCommand {
  constructor(
    public readonly chatId: Chat['id'],
    public readonly userId: Member['id'],
  ) {}
}
