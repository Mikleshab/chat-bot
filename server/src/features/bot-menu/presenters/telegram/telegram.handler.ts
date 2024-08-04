import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BOT_HEARS } from '@libs/telegram-bot/telegram-bot.module';
import { ShowBotMenuCommand } from '@features/bot-menu/application/show-bot-menu.command';
import { TelegramBotHears } from '@libs/telegram-bot/types/hears.interface';

@Injectable()
export class TelegramHandler {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(BOT_HEARS) private readonly handler: TelegramBotHears,
  ) {}

  public listen(): void {
    this.handler.hears('/menu', this.hearShowBotMenuCommand.bind(this));
  }

  private async hearShowBotMenuCommand(ctx: { from: { id: number } }) {
    this.commandBus.execute(new ShowBotMenuCommand(ctx.from.id));
  }
}
