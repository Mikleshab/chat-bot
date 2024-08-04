import { WelcomeMessageDomain } from '@features/welcome-message/domain/welcome-message.domain';
import { IEvent } from '@nestjs/cqrs';

export class WelcomeMessageEvent implements IEvent {
  constructor(
    readonly groupId: number,
    readonly message: WelcomeMessageDomain,
  ) {}
}
