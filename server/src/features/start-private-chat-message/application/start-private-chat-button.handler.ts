import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { StartPrivateChatButtonCommand } from '@features/start-private-chat-message/application/start-private-chat-button.command';
import { StartPrivateChatMessageRepository } from '@features/start-private-chat-message/application/start-private-chat-message.repository';
import { StartPrivateChatMessageDomain } from '@features/start-private-chat-message/domain/start-private-chat-message.domain';
import { StartPrivateChatMessageEvent } from '@features/start-private-chat-message/domain/start-private-chat-message.event';

@CommandHandler(StartPrivateChatButtonCommand)
export class StartPrivateChatButtonHandler implements ICommandHandler<StartPrivateChatButtonCommand, void> {
  constructor(
    private readonly repository: StartPrivateChatMessageRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: StartPrivateChatButtonCommand) {
    const { userId } = command;
    const json = await this.repository.getPrivateChatMessage();

    const message = StartPrivateChatMessageDomain.create(StartPrivateChatMessageDomain, json);

    this.eventBus.publish(new StartPrivateChatMessageEvent(userId, message));
  }
}
