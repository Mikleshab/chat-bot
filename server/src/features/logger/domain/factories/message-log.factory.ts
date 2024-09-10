import { LogMemberMessageCommand } from '@features/logger/application/commands/log-member-message.command';
import { MessageLog } from '@features/logger/domain/value-objects/message-log';

export class MessageLogFactory {
  static create(command: LogMemberMessageCommand): MessageLog {
    return new MessageLog(
      command.messageId,
      command.userId,
      command.text,
      command.date,
      command.replyToMessageId,
      command.chatId,
    );
  }
}
