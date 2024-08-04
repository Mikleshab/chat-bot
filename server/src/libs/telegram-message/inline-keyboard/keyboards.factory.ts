import { InlineKeyboardMarkup } from '@telegraf/types';
import { Markup } from 'telegraf';
import { isUrlButton, MessageKeyboardButtons } from '@libs/telegram-message/types/buttons';
import { ButtonsFactory } from '@libs/telegram-message/inline-keyboard/buttons.factory';

export class KeyboardsFactory {
  static inlineKeyboard(buttons: MessageKeyboardButtons[][]): Markup.Markup<InlineKeyboardMarkup> {
    const keyboard = buttons.map((row) => {
      return row.map((button) => {
        if (isUrlButton(button)) {
          return ButtonsFactory.urlButton(button);
        } else {
          return ButtonsFactory.callbackButton(button);
        }
      });
    });

    return Markup.inlineKeyboard(keyboard);
  }
}
