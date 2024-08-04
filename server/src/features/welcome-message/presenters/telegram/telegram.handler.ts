import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BOT_EVENT_HANDLER } from '@libs/telegram-bot/telegram-bot.module';
import { NewChatMemberCommand } from '@features/welcome-message/application/new-chat-member.command';
import { TelegramBotHandler } from '@libs/telegram-bot/types/handler.interface';

@Injectable()
export class TelegramHandler {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(BOT_EVENT_HANDLER) private readonly handler: TelegramBotHandler,
  ) {}

  public listen(): void {
    this.handler.handleEvent('new_chat_members', this.handleNewChatMembers.bind(this));
  }

  private handleNewChatMembers(ctx: any) {
    this.commandBus.execute(new NewChatMemberCommand(ctx.chat.id));
  }
}
