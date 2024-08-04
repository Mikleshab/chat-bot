import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BOT_SENDER } from '@libs/telegram-bot/telegram-bot.module';
import { FinishSurveyMessageEvent } from '@features/bot-survey/domain/events/finish-survey-message.event';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';

@EventsHandler(FinishSurveyMessageEvent)
export class FinishSurveyMessageHandler implements IEventHandler<FinishSurveyMessageEvent> {
  constructor(@Inject(BOT_SENDER) private readonly sender: TelegramBotSender) {}

  async handle(event: FinishSurveyMessageEvent) {
    const { userId, survey } = event;

    const questions = survey.getKeyboards();

    const { title, keyboard } = questions[0];
    this.sender.sendMessage(userId, survey.toTelegramText());
    this.sender.sendMessage(userId, title, keyboard);
  }
}
