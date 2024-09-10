import { PressAnswerButtonCommand } from '@features/bot-survey/application/commands/press-answer-button.command';
import { StartSurveyCommand } from '@features/bot-survey/application/commands/start-survey.command';
import { isMenuCallback } from '@libs/bot-menu/types/callback.type';
import { MenuActions } from '@libs/bot-menu/types/menu-actions.enum';
import { isSurveyCallback } from '@libs/bot-survey/types/callback.type';
import { MenuPayloadDto } from '@libs/telegram-bot/services/bot-callback.service';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class TelegramHandler {
  constructor(private readonly commandBus: CommandBus) {}

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
