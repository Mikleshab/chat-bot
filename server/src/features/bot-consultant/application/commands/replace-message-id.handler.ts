import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ReplaceMessageIdCommand } from '@features/bot-consultant/application/commands/replace-message-id.command';
import { MessageRepository } from '@features/bot-consultant/application/message.repository';

@CommandHandler(ReplaceMessageIdCommand)
export class ReplaceMessageIdHandler implements ICommandHandler<ReplaceMessageIdCommand, void> {
  constructor(private readonly repository: MessageRepository) {}

  async execute(command: ReplaceMessageIdCommand) {
    await this.repository.addTelegramMessageId(command.messageId, command.telegramMessageId);
  }
}
