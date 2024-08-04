import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BOT_CALLBACK_HANDLER } from '@libs/telegram-bot/telegram-bot.module';
import { MenuPayloadDto } from '@libs/telegram-bot/services/bot-callback.service';
import { MenuActions } from '@libs/bot-menu/types/menu-actions.enum';
import { PressAccidentButtonCommand } from '@features/accident-message/application/press-accident-button.command';
import { isMenuCallback } from '@libs/bot-menu/types/callback.type';
import { TelegramBotCallback } from '@libs/telegram-bot/types/callback.interface';

@Injectable()
export class TelegramHandler {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(BOT_CALLBACK_HANDLER) private readonly callback: TelegramBotCallback,
  ) {}

  public listen(): void {
    this.callback.handleCallback(this.handleMenuActions.bind(this));
  }

  private async handleMenuActions(data: MenuPayloadDto, ctx: { from: { id: number } }) {
    if (isMenuCallback(data)) {
      if (data.action === MenuActions.ACCIDENT) {
        this.commandBus.execute(new PressAccidentButtonCommand(ctx.from.id));
      }
    }
  }
}
