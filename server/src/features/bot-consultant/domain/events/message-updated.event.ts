import { IEvent } from '@nestjs/cqrs';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';

export class MessageUpdatedEvent implements IEvent {
  constructor(public readonly messageId: MessageDomain['messageId']) {}
}
