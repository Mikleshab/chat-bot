import { ICommand } from '@nestjs/cqrs';

export class HandleUpdateCommand<T> implements ICommand {
  constructor(public readonly update: T) {}
}
