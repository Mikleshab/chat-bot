import { Chat } from '@features/chat-bot/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';

export class MemberLog extends Member {
  constructor(
    public readonly id: Member['id'],
    public readonly firstName: Member['firstName'],
    public readonly lastName: Member['lastName'],
    public readonly username: Member['username'],
    public readonly country: Member['country'],
    public readonly chatId: Chat['id'],
    public readonly isBot: Member['isBot'],
  ) {
    super(id, firstName, lastName, username, country, isBot);
  }
}