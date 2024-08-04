import { ICommand } from '@nestjs/cqrs';

export class LeftGroupMemberCommand implements ICommand {
  constructor(public readonly userId: number) {}
}
