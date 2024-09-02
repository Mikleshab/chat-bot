import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddChatEventCommand } from './add-chat-event.command';
import { ChatEventRepository } from '../repositories/chat-event.repository';

@CommandHandler(AddChatEventCommand)
export class AddChatEventHandler implements ICommandHandler<AddChatEventCommand> {
  constructor(private readonly repository: ChatEventRepository) {}

  async execute(command: AddChatEventCommand): Promise<void> {
    const { chatId, eventType, announcementId } = command;

    await this.repository.add({ chatId, eventType, announcementId });
  }
}
