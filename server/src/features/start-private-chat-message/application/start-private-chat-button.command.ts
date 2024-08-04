import { ICommand } from '@nestjs/cqrs';

export class StartPrivateChatButtonCommand implements ICommand {
  constructor(public readonly userId: number) {}
}
