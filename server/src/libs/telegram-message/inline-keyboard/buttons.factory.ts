import { InlineKeyboardButton } from '@telegraf/types';
import { Markup } from 'telegraf';
import { MessageKeyboardCallbackButton, MessageKeyboardUrlButton } from '@libs/telegram-message/types/buttons';

export class ButtonsFactory {
  static callbackButton<T>(button: MessageKeyboardCallbackButton<T>): InlineKeyboardButton.CallbackButton {
    return Markup.button.callback(button.text, JSON.stringify(button.data));
  }

  static urlButton<T>(button: MessageKeyboardUrlButton): InlineKeyboardButton.UrlButton {
    return Markup.button.url(button.text, button.url);
  }
}
