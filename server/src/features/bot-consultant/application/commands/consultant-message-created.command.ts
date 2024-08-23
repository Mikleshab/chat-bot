import { ICommand } from '@nestjs/cqrs';
import { UserDomain } from '@features/bot-consultant/domain/user.domain';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';

export class ConsultantMessageCreatedCommand implements ICommand {
  constructor(
    public readonly text: string,
    public readonly replyToMessageId: MessageDomain['replyToMessageId'],
    public readonly clientId: UserDomain['userId'],
  ) {}
}
