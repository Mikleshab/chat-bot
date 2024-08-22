import { ICommand } from '@nestjs/cqrs';

export class ConsultantMessageCreatedCommand implements ICommand {
  constructor(
    public readonly text: string,
    public readonly parentId: string,
    public readonly clientId: string,
  ) {}
}
