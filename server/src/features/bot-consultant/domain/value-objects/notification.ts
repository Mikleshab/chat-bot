import { TelegramMessage } from '@libs/telegram-message/types/telegram-message.class';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';

export class Notification extends TelegramMessage {
  replay?: {
    parentTelegramId: MessageDomain['telegramMessageId'];
    replayMessageId: MessageDomain['messageId'];
  };
}
