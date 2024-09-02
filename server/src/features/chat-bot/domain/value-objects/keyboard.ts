import { ButtonUrl } from './button-url';
import { ButtonCallback } from './button-callback';

export class Keyboard<Button extends ButtonUrl | ButtonCallback> {
  constructor(
    public readonly title: string,
    public readonly buttons: Button[][],
  ) {}
}
