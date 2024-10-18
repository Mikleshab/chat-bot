import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Bot } from '@features/chat-bot/domain/models/bot';
import { SendMessageToMemberCommand } from '@features/chat-bot/application/commands/send-message-to-member.command';
import { Message } from '@features/chat-bot/domain/models/message';

@CommandHandler(SendMessageToMemberCommand)
export class SendMessageToMemberHandler implements ICommandHandler<SendMessageToMemberCommand> {
  constructor(private readonly bot: Bot) {}

  async execute(command: SendMessageToMemberCommand): Promise<Message> {
    const { memberId, text, replyToMessageId } = command;

    return this.bot.send(memberId, text, replyToMessageId);
  }
}
