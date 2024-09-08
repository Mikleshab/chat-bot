import { Keyboard } from '@features/chat-bot/domain/value-objects/keyboard';
import { ButtonUrl } from '@features/chat-bot/domain/value-objects/button-url';
import { ButtonCallback } from '@features/chat-bot/domain/value-objects/button-callback';

export class Message {
  private keyboards: Keyboard<ButtonUrl | ButtonCallback>[] = [];

  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly date: number,
    public readonly replyToMessageId: number | null,
  ) {}

  setKeyboards(keyboards: Keyboard<ButtonUrl>[]) {
    this.keyboards = keyboards;
  }

  getKeyboard() {
    return this.keyboards;
  }
}
