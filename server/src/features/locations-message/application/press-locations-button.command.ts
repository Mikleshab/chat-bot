import { ICommand } from '@nestjs/cqrs';

export class PressLocationsButtonCommand implements ICommand {
  constructor(public readonly userId: number) {}
}
