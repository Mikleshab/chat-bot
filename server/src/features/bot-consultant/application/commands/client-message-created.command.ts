import { ICommand } from '@nestjs/cqrs';

export class ClientMessageCreatedCommand implements ICommand {
  constructor(
    public readonly telegramMessageId: number,
    public readonly userId: number,
    public readonly username: string,
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly country: string,
    public readonly text: string,
    public readonly date: number,
    public readonly replyId: number | null,
  ) {}
}
