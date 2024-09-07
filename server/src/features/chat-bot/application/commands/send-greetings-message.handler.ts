import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { SendGreetingsMessageCommand } from './send-greetings-message.command';
import { Bot } from '../../domain/models/bot';
import { GetChatEventByTypeQuery } from '@features/chat-events/application/queries/get-chat-event-by-type.query';
import { ChatEvent } from '@features/chat-events/domain/model/chat-event';
import { GetAnnouncementQuery } from '@features/chat-announcements/application/queries/get-announcement.query';
import { Announcement } from '@features/chat-announcements/domain/model/announcement';
import { ChatEventType } from '@features/chat-events/domain/value-objects/chat-event-options';

@CommandHandler(SendGreetingsMessageCommand)
export class ActivateHandlerHandler implements ICommandHandler<SendGreetingsMessageCommand> {
  constructor(
    private readonly bot: Bot,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(command: SendGreetingsMessageCommand): Promise<any> {
    const { chatId } = command;

    const event = await this.queryBus.execute<GetChatEventByTypeQuery, ChatEvent>(
      new GetChatEventByTypeQuery(chatId, ChatEventType.GREETINGS),
    );

    const announcement = await this.queryBus.execute<GetAnnouncementQuery, Announcement>(
      new GetAnnouncementQuery(event.announcementId),
    );

    this.bot.send(chatId, announcement);
  }
}
