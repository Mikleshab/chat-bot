import { ICommand } from '@nestjs/cqrs';

export class SaveMessageCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly isBot: boolean,
    public readonly username: string | null,
    public readonly firstname: string | null,
    public readonly lastname: string | null,
    public readonly text: string,
    public readonly date: number,
    public readonly reply?: number,
  ) {}
}
