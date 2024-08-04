import { ICommand } from '@nestjs/cqrs';

export class NewChatMemberCommand implements ICommand {
  constructor(public readonly groupId: number) {}
}
