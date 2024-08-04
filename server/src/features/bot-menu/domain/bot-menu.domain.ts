import { TelegramMessage } from '@libs/telegram-message/types/telegram-message.class';
import { ButtonsFactory } from '@features/bot-menu/domain/factory/buttons.factory';

export class BotMenuDomain extends TelegramMessage {
  keyboards = [
    {
      title: `Меню`,
      buttons: [
        [ButtonsFactory.locationsButton(), ButtonsFactory.accidentButton()],
        [ButtonsFactory.surveyButton(), ButtonsFactory.askQuestionButton()],
      ],
    },
  ];
}
