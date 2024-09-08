import { Keyboard } from '../value-objects/keyboard';
import { ButtonUrl } from '../value-objects/button-url';
import { ButtonCallback } from '../value-objects/button-callback';

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
