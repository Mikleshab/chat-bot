import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WelcomeMessageEvent } from '@features/welcome-message/domain/welcome-message.event';
import { Inject } from '@nestjs/common';
import { BOT_SENDER } from '@libs/telegram-bot/telegram-bot.module';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';

@EventsHandler(WelcomeMessageEvent)
export class WelcomeMessageHandler implements IEventHandler<WelcomeMessageEvent> {
  constructor(@Inject(BOT_SENDER) private readonly sender: TelegramBotSender) {}

  async handle(event: WelcomeMessageEvent) {
    const { groupId, message } = event;

    this.sender.sendMessage(groupId, message.toTelegramText());
  }
}
