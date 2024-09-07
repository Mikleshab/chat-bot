import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddChatEventCommand } from './add-chat-event.command';
import { ChatEventRepository } from '../repositories/chat-event.repository';
import { ChatEventType } from '@features/chat-events/domain/value-objects/chat-event-options';

@CommandHandler(AddChatEventCommand)
export class AddChatEventHandler implements ICommandHandler<AddChatEventCommand> {
  constructor(private readonly repository: ChatEventRepository) {}

  async execute(command: AddChatEventCommand): Promise<void> {
    const { chatId, title, eventOptions, announcementId } = command;

    await this.repository.add({
      chatId,
      title,
      eventOptions: { ...eventOptions, system: false, type: ChatEventType.RECURRENT },
      announcementId,
    });
  }
}
