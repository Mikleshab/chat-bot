import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BOT_SENDER } from '@libs/telegram-bot/telegram-bot.module';
import { BotMenuEvent } from '@features/bot-menu/domain/bot-menu.event';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';

@EventsHandler(BotMenuEvent)
export class SendBotMenuHandler implements IEventHandler<BotMenuEvent> {
  constructor(@Inject(BOT_SENDER) private readonly sender: TelegramBotSender) {}

  async handle(event: BotMenuEvent) {
    const { userId, botMenu } = event;

    const [{ title, keyboard }] = botMenu.getKeyboards();

    this.sender.sendMessage(userId, title, keyboard);
  }
}
