import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BOT_EVENT_HANDLER } from '@libs/telegram-bot/telegram-bot.module';
import { SaveMessageCommand } from '@features/chat-statistics/application/commands/save-message.command';
import { NewGroupMemberCommand } from '@features/chat-statistics/application/commands/new-group-member.command';
import { LeftGroupMemberCommand } from '@features/chat-statistics/application/commands/left-group-member.command';
import { TelegramBotHandler } from '@libs/telegram-bot/types/handler.interface';

@Injectable()
export class TelegramHandler {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(BOT_EVENT_HANDLER) private readonly handler: TelegramBotHandler,
  ) {}

  public listen(): void {
    // this.handler.handleEvent('text', this.handleGroupMessages.bind(this));
    // this.handler.handleEvent('new_chat_members', this.handleNewGroupMembers.bind(this));
    // this.handler.handleEvent('left_chat_member', this.handleLeftGroupMember.bind(this));
  }

  private handleGroupMessages(ctx: {
    message: { message_id: number; text: string; date: number; reply_to_message?: { message_id: number } };
    from: { id: number; username?: string; first_name?: string; last_name?: string; is_bot: boolean };
    chat: { type: string };
  }) {
    if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
      this.commandBus.execute(
        new SaveMessageCommand(
          ctx.message.message_id,
          ctx.from.id,
          ctx.from.is_bot,
          ctx.from.username || '',
          ctx.from.first_name || '',
          ctx.from.last_name || '',
          ctx.message.text,
          ctx.message.date,
          ctx.message.reply_to_message?.message_id,
        ),
      );
    }
  }

  private handleNewGroupMembers(ctx: {
    message: {
      date: number;
      new_chat_member: {
        id: number;
        is_bot: boolean;
        first_name?: string;
        last_name?: string;
        username?: string;
      };
    };
  }) {
    this.commandBus.execute(
      new NewGroupMemberCommand(
        ctx.message.new_chat_member.id,
        ctx.message.new_chat_member.is_bot,
        ctx.message.new_chat_member.username || '',
        ctx.message.new_chat_member.first_name || '',
        ctx.message.new_chat_member.last_name || '',
        ctx.message.date,
      ),
    );
  }

  private handleLeftGroupMember(ctx: {
    message: {
      left_chat_member: {
        id: number;
      };
    };
  }) {
    this.commandBus.execute(new LeftGroupMemberCommand(ctx.message.left_chat_member.id));
  }
}
