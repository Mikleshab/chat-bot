import { ICommand } from '@nestjs/cqrs';
import { Member } from '@features/chat-bot/domain/models/member';
import { Message } from '@features/chat-bot/domain/models/message';
import { Chat } from '@features/chat/domain/models/chat';

export class SaveMemberPrivateMessageCommand implements ICommand {
  constructor(
    public readonly member: Member,
    public readonly message: Message,
    public readonly chat: Chat,
  ) {}
}
