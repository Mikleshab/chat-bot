import { BotMenuDomain } from '@features/bot-menu/domain/bot-menu.domain';
import { IEvent } from '@nestjs/cqrs';

export class BotMenuEvent implements IEvent {
  constructor(
    readonly userId: number,
    readonly botMenu: BotMenuDomain,
  ) {}
}
