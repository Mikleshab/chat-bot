import { MessageKeyboardUrlButton } from '@libs/telegram-message/types/buttons';

export class ButtonsFactory {
  static startPrivateChatButton() {
    return new MessageKeyboardUrlButton(`Начать личный чат с ботом`, `https://t.me/dashicheska_bot`);
  }
}
