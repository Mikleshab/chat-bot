import { ICommand } from '@nestjs/cqrs';

export class NewGroupMemberCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly isBot: boolean,
    public readonly username: string | null,
    public readonly firstname: string | null,
    public readonly lastname: string | null,
    public readonly date: number,
  ) {}
}
