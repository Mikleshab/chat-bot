import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Bot } from '@features/chat-bot/domain/models/bot';
import { HandleUpdateCommand } from '@features/chat-bot/application/commands/handle-update.command';

@CommandHandler(HandleUpdateCommand)
export class HandleUpdateHandler implements ICommandHandler<HandleUpdateCommand<unknown>> {
  constructor(private readonly bot: Bot) {}

  async execute(command: HandleUpdateCommand<unknown>): Promise<any> {
    const { update } = command;

    await this.bot.update(update);
  }
}
