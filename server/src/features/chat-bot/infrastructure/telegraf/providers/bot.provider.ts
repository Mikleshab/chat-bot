import { Provider } from '@nestjs/common';
import { BotRepository } from '../../../application/repositories/bot.repository';
import { EventHandler } from '../services/event.handler';
import { SenderService } from '../services/sender.service';
import { TelegrafBotRepository } from '../repositories/telegraf-bot.repository';

export const BOT_REPOSITORY_PROVIDER: Provider = {
  provide: BotRepository,
  useFactory: (eventHandler: EventHandler, sender: SenderService) => {
    return new TelegrafBotRepository(eventHandler, sender);
  },
  inject: [EventHandler, SenderService],
};
