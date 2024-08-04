import { TelegramMessage } from '@libs/telegram-message/types/telegram-message.class';
import { ButtonsFactory } from '@features/start-private-chat-message/domain/factory/buttons.factory';

export class StartPrivateChatMessageDomain extends TelegramMessage {
  keyboards = [
    {
      title: `Меню`,
      buttons: [[ButtonsFactory.startPrivateChatButton()]],
    },
  ];
}
