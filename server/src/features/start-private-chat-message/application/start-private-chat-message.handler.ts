import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BOT_SENDER } from '@libs/telegram-bot/telegram-bot.module';
import { StartPrivateChatMessageEvent } from '@features/start-private-chat-message/domain/start-private-chat-message.event';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';

@EventsHandler(StartPrivateChatMessageEvent)
export class StartPrivateChatMessageHandler implements IEventHandler<StartPrivateChatMessageEvent> {
  constructor(@Inject(BOT_SENDER) private readonly sender: TelegramBotSender) {}

  async handle(event: StartPrivateChatMessageEvent) {
    const { userId, message } = event;

    this.sender.sendMessage(userId, message.toTelegramText());

    const [{ title, keyboard }] = message.getKeyboards();
    this.sender.sendMessage(userId, title, keyboard);
  }
}
