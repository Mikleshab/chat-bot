import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BOT_CALLBACK_HANDLER } from '@libs/telegram-bot/telegram-bot.module';
import { MenuPayloadDto } from '@libs/telegram-bot/services/bot-callback.service';
import { isSurveyCallback } from '@libs/bot-survey/types/callback.type';
import { isMenuCallback } from '@libs/bot-menu/types/callback.type';
import { MenuActions } from '@libs/bot-menu/types/menu-actions.enum';
import { StartSurveyCommand } from '@features/bot-survey/application/commands/start-survey.command';
import { PressAnswerButtonCommand } from '@features/bot-survey/application/commands/press-answer-button.command';
import { TelegramBotCallback } from '@libs/telegram-bot/types/callback.interface';

@Injectable()
export class TelegramHandler {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(BOT_CALLBACK_HANDLER) private readonly callback: TelegramBotCallback,
  ) {}

  public listen(): void {
    this.callback.handleCallback(this.handleSurveyMenuButton.bind(this));
    this.callback.handleCallback(this.handleSurveyActions.bind(this));
  }

  private handleSurveyMenuButton(data: MenuPayloadDto, ctx: { from: { id: number } }) {
    if (isMenuCallback(data)) {
      if (data.action === MenuActions.SURVEY) {
        this.commandBus.execute(new StartSurveyCommand(ctx.from.id));
      }
    }
  }

  private handleSurveyActions(data: MenuPayloadDto, ctx: { from: { id: number } }) {
    if (isSurveyCallback(data)) {
      this.commandBus.execute(new PressAnswerButtonCommand(ctx.from.id, data.questionIndex, data.answerIndex));
    }
  }
}
