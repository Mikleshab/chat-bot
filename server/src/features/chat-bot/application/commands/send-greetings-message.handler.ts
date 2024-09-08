import { GetAnnouncementQuery } from '@features/announcements/application/queries/get-announcement.query';
import { Announcement } from '@features/announcements/domain/model/announcement';
import { GetChatEventByTypeQuery } from '@features/events/application/queries/get-chat-event-by-type.query';
import { ChatEvent } from '@features/events/domain/model/chat-event';
import { ChatEventType } from '@features/events/domain/value-objects/chat-event-options';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Bot } from '../../domain/models/bot';
import { SendGreetingsMessageCommand } from './send-greetings-message.command';

@CommandHandler(SendGreetingsMessageCommand)
export class SendGreetingsMessageHandler implements ICommandHandler<SendGreetingsMessageCommand> {
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

    await this.bot.send(chatId, announcement.text);
  }
}
