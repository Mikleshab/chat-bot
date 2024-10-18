import { Chat } from '@features/chat/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';

export class LogNewMemberCommand {
  constructor(
    public readonly chatId: Chat['id'],
    public readonly userId: Member['id'],
    public readonly isBot: boolean,
    public readonly username: Member['username'],
    public readonly firstName: Member['firstName'],
    public readonly lastName: Member['lastName'],
    public readonly country: Member['country'],
    public readonly date: number,
  ) {}
}
