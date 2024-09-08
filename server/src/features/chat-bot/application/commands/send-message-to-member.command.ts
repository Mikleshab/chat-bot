import { ICommand } from '@nestjs/cqrs';
import { Member } from '@features/chat-bot/domain/models/member';
import { Message } from '@features/chat-bot/domain/models/message';

export class SendMessageToMemberCommand implements ICommand {
  constructor(
    public readonly memberId: Member['id'],
    public readonly text: Message['text'],
    public readonly replyToMessageId: Message['replyToMessageId'],
  ) {}
}
