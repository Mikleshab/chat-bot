import { ICommand } from '@nestjs/cqrs';

export class NewQuestionCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly username: string,
    public readonly firstname: string,
    public readonly text: string,
    public readonly date: number,
  ) {}
}
