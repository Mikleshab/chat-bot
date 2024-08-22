import { ICommand } from '@nestjs/cqrs';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';

export class ReplaceMessageIdCommand implements ICommand {
  constructor(
    public readonly messageId: MessageDomain['messageId'],
    public readonly telegramMessageId: MessageDomain['telegramMessageId'],
  ) {}
}
