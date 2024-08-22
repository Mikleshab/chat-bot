import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BOT_SENDER } from '@libs/telegram-bot/telegram-bot.module';
import { NotificationEvent } from '@features/bot-consultant/domain/events/notification.event';
import { TelegramBotSender } from '@libs/telegram-bot/types/sender.interface';
import { ReplySentEvent } from '@features/bot-consultant/domain/events/reply-sent.event';

@EventsHandler(NotificationEvent)
export class NotificationHandler implements IEventHandler<NotificationEvent> {
  constructor(
    @Inject(BOT_SENDER) private readonly sender: TelegramBotSender,
    private readonly eventBus: EventBus,
  ) {}

  async handle(event: NotificationEvent) {
    if (event.notification.replay) {
      await this.sendReplay(event);
    } else {
      await this.sendMessage(event);
    }
  }

  private async sendReplay(event: NotificationEvent) {
    const parentMessageTelegramId = event.notification.replay?.parentTelegramId;
    const reply_parameters = parentMessageTelegramId ? { message_id: parentMessageTelegramId } : undefined;

    const response = await this.sender.sendMessage(parseInt(event.clientId), event.notification.toTelegramText(), {
      reply_parameters,
    });

    this.eventBus.publish(new ReplySentEvent(response.message_id, event.notification.replay?.replayMessageId!));
  }

  private async sendMessage(event: NotificationEvent, reply_parameters?: { message_id: number }) {
    return await this.sender.sendMessage(parseInt(event.clientId), event.notification.toTelegramText(), {
      reply_parameters,
    });
  }
}
