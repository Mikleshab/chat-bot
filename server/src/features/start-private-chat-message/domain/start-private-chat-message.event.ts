import { IEvent } from '@nestjs/cqrs';
import { StartPrivateChatMessageDomain } from '@features/start-private-chat-message/domain/start-private-chat-message.domain';

export class StartPrivateChatMessageEvent implements IEvent {
  constructor(
    readonly userId: number,
    readonly message: StartPrivateChatMessageDomain,
  ) {}
}
