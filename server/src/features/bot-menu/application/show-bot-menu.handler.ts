import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ShowBotMenuCommand } from '@features/bot-menu/application/show-bot-menu.command';
import { BotMenuEvent } from '@features/bot-menu/domain/bot-menu.event';
import { BotMenuDomain } from '@features/bot-menu/domain/bot-menu.domain';

@CommandHandler(ShowBotMenuCommand)
export class ShowBotMenuHandler implements ICommandHandler<ShowBotMenuCommand, void> {
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: ShowBotMenuCommand) {
    const { userId } = command;
    const botMenu = BotMenuDomain.create(BotMenuDomain);

    this.eventBus.publish(new BotMenuEvent(userId, botMenu));
  }
}
