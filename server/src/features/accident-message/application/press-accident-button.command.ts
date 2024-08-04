import { ICommand } from '@nestjs/cqrs';

export class PressAccidentButtonCommand implements ICommand {
  constructor(public readonly userId: number) {}
}
