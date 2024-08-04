import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BOT_EVENT_HANDLER } from '@libs/telegram-bot/telegram-bot.module';
import { NewQuestionCommand } from '@features/bot-consultant/application/new-question.command';
import { TelegramBotHandler } from '@libs/telegram-bot/types/handler.interface';

@Injectable()
export class TelegramHandler {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(BOT_EVENT_HANDLER) private readonly handler: TelegramBotHandler,
  ) {}

  public listen(): void {
    this.handler.handleEvent('text', this.handlePrivateMessages.bind(this));
  }

  private handlePrivateMessages(ctx: {
    message: { text: string; date: number };
    from: { id: number; username?: string; first_name?: string };
    chat: { type: string };
  }) {
    if (ctx.chat.type === 'private') {
      this.commandBus.execute(
        new NewQuestionCommand(
          ctx.from.id,
          ctx.from.username || 'empty username',
          ctx.from.first_name || '',
          ctx.message.text,
          ctx.message.date,
        ),
      );
    }
  }
}
