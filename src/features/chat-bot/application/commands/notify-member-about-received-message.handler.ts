import { NotifyMemberAboutReceivedMessageCommand } from '@features/chat-bot/application/commands/notify-member-about-received-message.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Bot } from '@features/chat-bot/domain/models/bot';

@CommandHandler(NotifyMemberAboutReceivedMessageCommand)
export class NotifyMemberAboutReceivedMessageHandler
  implements ICommandHandler<NotifyMemberAboutReceivedMessageCommand>
{
  constructor(private readonly bot: Bot) {}

  async execute(command: NotifyMemberAboutReceivedMessageCommand): Promise<any> {
    const { chat } = command;

    await this.bot.send(chat.id, `Ваше сообщение получено.`);
  }
}
