import { AccidentMessageDomain } from '@features/accident-message/domain/accident-message.domain';
import { IEvent } from '@nestjs/cqrs';

export class AccidentMessageEvent implements IEvent {
  constructor(
    readonly userId: number,
    readonly message: AccidentMessageDomain,
  ) {}
}
