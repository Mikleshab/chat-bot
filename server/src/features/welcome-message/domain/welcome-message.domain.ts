import { TelegramMessage } from '@libs/telegram-message/types/telegram-message.class';
import { instanceToPlain } from 'class-transformer';

export class WelcomeMessageDomain extends TelegramMessage {
  toObject(): object {
    return instanceToPlain(this, { exposeUnsetFields: false });
  }
}
