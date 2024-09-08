import { Message } from '@features/chat-statistics/domain/models/message';
import { Member } from '@features/chat-statistics/domain/models/member';

export abstract class StatisticsRepository {
  abstract saveMessage(messageDomain: Message): Promise<void>;

  abstract getMessagesCount(): Promise<number>;

  abstract getMessageHistory(): Promise<Message[]>;

  abstract saveMember(memberDomain: Member): Promise<void>;

  abstract deleteMember(id: Member['userId']): Promise<void>;

  abstract getMembersCount(): Promise<number>;

  abstract getMembersHistory(): Promise<Member[]>;
}
