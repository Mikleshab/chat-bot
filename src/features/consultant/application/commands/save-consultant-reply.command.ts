import { ICommand } from '@nestjs/cqrs';
import { UserDomain } from '@features/consultant/domain/models/user.domain';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';

export class SaveConsultantReplyCommand implements ICommand {
  constructor(
    public readonly text: string,
    public readonly replyToMessageId: ConversationMessage['telegramMessageId'],
    public readonly clientId: UserDomain['userId'],
  ) {}
}
