import { Provider } from '@nestjs/common';
import { BotRepository } from '@features/chat-bot/application/repositories/bot.repository';
import { EventHandler } from '@features/chat-bot/infrastructure/telegraf/services/event.handler';
import { SenderService } from '@features/chat-bot/infrastructure/telegraf/services/sender.service';
import { TelegrafBotRepository } from '@features/chat-bot/infrastructure/telegraf/repositories/telegraf-bot.repository';
import { BotService } from '@features/chat-bot/infrastructure/telegraf/services/bot.service';
import { EventPublisher } from '@nestjs/cqrs';

export const BOT_REPOSITORY_PROVIDER: Provider = {
  provide: BotRepository,
  useFactory: (
    botService: BotService,
    eventHandler: EventHandler,
    sender: SenderService,
    publisher: EventPublisher,
  ) => {
    return new TelegrafBotRepository(botService, eventHandler, sender, publisher);
  },
  inject: [BotService, EventHandler, SenderService, EventPublisher],
};
