import { Chat } from '@features/chat/domain/models/chat';
import { Member } from '@features/chat-bot/domain/models/member';
import { MemberLog } from '@features/logger/domain/value-objects/member-log';
import { MessageLog } from '@features/logger/domain/value-objects/message-log';

export abstract class LoggerRepository {
  abstract saveMember(memberLog: MemberLog): Promise<void>;

  abstract deleteMember(chatId: Chat['id'], memberId: Member['id']): Promise<void>;

  abstract saveMessage(messageLog: MessageLog): Promise<void>;
}
