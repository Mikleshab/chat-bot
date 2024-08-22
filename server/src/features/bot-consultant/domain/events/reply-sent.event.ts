import { IEvent } from '@nestjs/cqrs';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';

export class ReplySentEvent implements IEvent {
  constructor(
    readonly telegramMessageId: MessageDomain['telegramMessageId'],
    readonly messageId: MessageDomain['messageId'],
  ) {}
}
