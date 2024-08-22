import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BOT_EVENT_HANDLER } from '@libs/telegram-bot/telegram-bot.module';
import { TelegramBotHandler } from '@libs/telegram-bot/types/handler.interface';
import { ClientMessageCreatedCommand } from '@features/bot-consultant/application/commands/client-message-created.command';

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
    message: { message_id: number; text: string; date: number; reply_to_message?: { message_id: number } };
    from: { id: number; username?: string; first_name?: string; last_name?: string; language_code: string };
    chat: { type: string };
  }) {
    const { chat, message, from } = ctx;
    if (chat.type === 'private') {
      this.commandBus.execute(
        new ClientMessageCreatedCommand(
          message.message_id,
          from.id,
          from.username || 'empty username',
          from.first_name || '',
          from.last_name || '',
          from.language_code,
          message.text,
          message.date * 1000,
          message.reply_to_message?.message_id || null,
        ),
      );
    }
  }
}
