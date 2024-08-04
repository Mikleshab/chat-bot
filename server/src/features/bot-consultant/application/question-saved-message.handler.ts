import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BOT_SENDER } from '@libs/telegram-bot/telegram-bot.module';
import { QuestionSavedMessageEvent } from '@features/bot-consultant/domain/question-saved-message.event';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';

@EventsHandler(QuestionSavedMessageEvent)
export class QuestionSavedMessageHandler implements IEventHandler<QuestionSavedMessageEvent> {
  constructor(@Inject(BOT_SENDER) private readonly sender: TelegramBotSender) {}

  async handle(event: QuestionSavedMessageEvent) {
    const { userId, message } = event;

    this.sender.sendMessage(userId, message.toTelegramText());
  }
}
