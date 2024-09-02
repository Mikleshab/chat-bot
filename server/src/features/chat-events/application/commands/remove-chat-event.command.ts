import { ICommand } from '@nestjs/cqrs';
import { ChatEvent } from '../../domain/model/chat-event';

export class RemoveChatEventCommand implements ICommand {
  constructor(public readonly id: ChatEvent['id']) {}
}
