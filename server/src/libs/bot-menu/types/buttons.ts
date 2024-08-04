import { MessageKeyboardCallbackButton } from '@libs/telegram-message/types/buttons';
import { MenuCallbackDto } from '@libs/bot-menu/types/callback.type';
import { MenuActions } from '@libs/bot-menu/types/menu-actions.enum';

export class MenuButton extends MessageKeyboardCallbackButton<MenuCallbackDto> {
  constructor(text: string, action: MenuActions) {
    super(text, { type: 'menu', action });
  }
}
