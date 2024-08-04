import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';
import { Type } from '@nestjs/common';
import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from '@telegraf/types';
import { MessageKeyboard } from '@libs/telegram-message/types/keyboard';
import { KeyboardsFactory } from '@libs/telegram-message/inline-keyboard/keyboards.factory';
import { MessageKeyboardButtons } from '@libs/telegram-message/types/buttons';

export abstract class TelegramMessage {
  static create<T extends TelegramMessage>(cls: Type<T>, data?: object): T {
    if (!data) {
      return new cls();
    }

    const message = plainToInstance(cls, data);

    const errors = validateSync(message);

    if (errors.length > 0) {
      throw new Error(`Validation failed. Errors: ${JSON.stringify(errors)}`);
    }

    return message as T;
  }

  protected readonly keyboards: MessageKeyboard<MessageKeyboardButtons>[] = [];

  @IsString()
  public text!: string;

  toTelegramText(): string {
    return this.text.replace(/[\\*_\[\]()~`>#+\-=|{}.!]/g, '\\$&');
  }

  getKeyboards(): { title: string; keyboard: Markup.Markup<InlineKeyboardMarkup> }[] {
    return this.keyboards.map(({ title, buttons }) => {
      return {
        title,
        keyboard: KeyboardsFactory.inlineKeyboard(buttons),
      };
    });
  }
}
