import { MessageKeyboardButtons } from '@libs/telegram-message/types/buttons';

export interface MessageKeyboard<T extends MessageKeyboardButtons> {
  title: string;
  buttons: T[][];
}
