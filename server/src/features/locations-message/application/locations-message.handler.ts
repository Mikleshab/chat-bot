import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BOT_SENDER } from '@libs/telegram-bot/telegram-bot.module';
import { LocationsMessageEvent } from '@features/locations-message/domain/locations-message.event';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';

@EventsHandler(LocationsMessageEvent)
export class LocationsMessageHandler implements IEventHandler<LocationsMessageEvent> {
  constructor(@Inject(BOT_SENDER) private readonly sender: TelegramBotSender) {}

  async handle(event: LocationsMessageEvent) {
    const { userId, message } = event;

    this.sender.sendMessage(userId, message.toTelegramText());
  }
}
