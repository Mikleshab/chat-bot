import { BotRepository } from '../../../application/repositories/bot.repository';
import { EventHandler } from '../services/event.handler';
import { Chat } from '@features/chat-bot/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';
import { ChatFactory } from '@features/chat-bot/infrastructure/telegraf/factories/chat.factory';
import { MemberFactory } from '@features/chat-bot/infrastructure/telegraf/factories/member.factory';
import { Announcement } from '@features/chat-announcements/domain/model/announcement';
import { SenderService } from '@features/chat-bot/infrastructure/telegraf/services/sender.service';
import { TextFactory } from '@features/chat-bot/infrastructure/telegraf/factories/text.factory';
import { ExtraFactory } from '@features/chat-bot/infrastructure/telegraf/factories/extra.factory';
import { ChatMemberUpdated } from '@telegraf/types';

export class TelegrafBotRepository implements BotRepository {
  constructor(
    private readonly eventHandler: EventHandler,
    private readonly sender: SenderService,
  ) {}

  handleJoin(handler: (chat: Chat, member: Member) => void): void {
    this.eventHandler.handle('new_chat_members', (ctx: ChatMemberUpdated) => {
      handler(ChatFactory.toDomain(ctx.chat.id), MemberFactory.toDomain(ctx.new_chat_member.user));
    });
  }

  handleLeft(handler: (chat: Chat, member: Member) => void): void {
    this.eventHandler.handle('left_chat_member', (ctx: ChatMemberUpdated) => {
      handler(ChatFactory.toDomain(ctx.chat.id), MemberFactory.toDomain(ctx.from));
    });
  }

  send(chatId: Chat['id'], announcement: Announcement): void {
    this.sender.sendMessage(chatId, TextFactory.toText(announcement), ExtraFactory.toExtra(announcement));
  }
}
