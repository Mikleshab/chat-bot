import { ICommand } from '@nestjs/cqrs';
import { Chat } from '@features/chat/domain/models/chat';

export class NotifyMemberAboutReceivedMessageCommand implements ICommand {
  constructor(public readonly chat: Chat) {}
}
