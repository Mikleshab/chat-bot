import { MenuPayloadDto } from '@libs/telegram-bot/services/bot-callback.service';
import { CallbackData } from '@libs/telegram-bot/types/callback-data.type';
import { IsString } from 'class-validator';
import { MenuActions } from '@libs/bot-menu/types/menu-actions.enum';

export class MenuCallbackDto extends CallbackData {
  @IsString()
  type = 'menu';

  @IsString()
  action!: MenuActions;
}

export const isMenuCallback = (data: MenuPayloadDto): data is MenuCallbackDto => data.type === 'menu';
