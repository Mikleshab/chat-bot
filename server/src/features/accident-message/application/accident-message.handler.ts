import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BOT_SENDER } from '@libs/telegram-bot/telegram-bot.module';
import { AccidentMessageEvent } from '@features/accident-message/domain/accident-message.event';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';

@EventsHandler(AccidentMessageEvent)
export class AccidentMessageHandler implements IEventHandler<AccidentMessageEvent> {
  constructor(@Inject(BOT_SENDER) private readonly sender: TelegramBotSender) {}

  async handle(event: AccidentMessageEvent) {
    const { userId, message } = event;

    this.sender.sendMessage(userId, message.toTelegramText());
  }
}
