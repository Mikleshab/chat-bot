import { Message } from '@features/chat-bot/domain/models/message';
import { EventPublisher } from '@nestjs/cqrs';
import { Message as TelegramMessage } from '@telegraf/types';
import { Context } from 'telegraf';
import { Telegram } from 'telegraf/src/core/types/typegram';
import { BotRepository } from '@features/chat-bot/application/repositories/bot.repository';
import { Chat } from '@features/chat-bot/domain/models/chat';
import { ChatMapper } from '@features/chat-bot/infrastructure/telegraf/mappers/chat.mapper';
import { ExtraMapper } from '@features/chat-bot/infrastructure/telegraf/mappers/extra.mapper';
import { MemberMapper } from '@features/chat-bot/infrastructure/telegraf/mappers/member.mapper';
import { MessageMapper } from '@features/chat-bot/infrastructure/telegraf/mappers/message.mapper';
import { TextMapper } from '@features/chat-bot/infrastructure/telegraf/mappers/text.mapper';
import { BotService } from '@features/chat-bot/infrastructure/telegraf/services/bot.service';
import { EventHandler } from '@features/chat-bot/infrastructure/telegraf/services/event.handler';
import { SenderService } from '@features/chat-bot/infrastructure/telegraf/services/sender.service';

export class TelegrafBotRepository implements BotRepository {
  constructor(
    private readonly botService: BotService,
    private readonly eventHandler: EventHandler,
    private readonly sender: SenderService,
    private readonly publisher: EventPublisher,
  ) {}

  launch({ production }: { production: boolean }): void {
    if (production) {
    } else {
      this.botService.launchWithRetry();

      this.eventHandler.handle('new_chat_members', (ctx: Context) => {
        const message = ctx.message;
        const chat = ChatMapper.toDomain(message!.chat);
        const member = this.publisher.mergeObjectContext(MemberMapper.toDomain(message!.from));
        member.join(chat);
      });

      this.eventHandler.handle('left_chat_member', (ctx: Context) => {
        const message = ctx.message;
        const chat = ChatMapper.toDomain(message!.chat);
        const member = this.publisher.mergeObjectContext(MemberMapper.toDomain(message!.from));
        member.left(chat);
      });

      this.eventHandler.handle('text', (ctx: Context) => {
        const telegramMessage = ctx.message as TelegramMessage.TextMessage;
        const chat = ChatMapper.toDomain(telegramMessage!.chat);
        const member = this.publisher.mergeObjectContext(MemberMapper.toDomain(telegramMessage!.from!));
        const message = MessageMapper.toDomain(telegramMessage);
        if (chat.type === 'private') {
          member.sendPrivate(message, chat);
        }
      });
    }
  }

  async stop(): Promise<void> {
    return this.botService.getBot().stop(`Server terminated.`);
  }

  async send(chatId: Chat['id'], message: Message | string, replyToMessageId?: number | null): Promise<Message> {
    let result: ReturnType<Telegram['sendMessage']>;
    if (typeof message === 'string') {
      result = await this.sender.sendMessageWithRetry(chatId, message, ExtraMapper.toExtra(replyToMessageId || null));
    } else {
      result = await this.sender.sendMessageWithRetry(
        chatId,
        TextMapper.toText(message),
        ExtraMapper.toExtra(message.replyToMessageId),
      );
    }

    return MessageMapper.toDomain(result);
  }
}
