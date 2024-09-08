import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatEventRepository } from '@features/events/application/repositories/chat-event.repository';
import { RemoveChatEventCommand } from './remove-chat-event.command';

@CommandHandler(RemoveChatEventCommand)
export class RemoveChatEventHandler implements ICommandHandler<RemoveChatEventCommand> {
  constructor(private readonly repository: ChatEventRepository) {}

  async execute(command: RemoveChatEventCommand): Promise<void> {
    const { id } = command;

    await this.repository.removeById(id);
  }
}
