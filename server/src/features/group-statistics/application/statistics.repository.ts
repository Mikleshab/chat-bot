import { MessageDomain } from '@features/group-statistics/domain/message.domain';
import { MemberDomain } from '@features/group-statistics/domain/member.domain';

export abstract class StatisticsRepository {
  abstract saveMessage(messageDomain: MessageDomain): Promise<void>;

  abstract getMessagesCount(): Promise<number>;

  abstract getMessageHistory(): Promise<MessageDomain[]>;

  abstract saveMember(memberDomain: MemberDomain): Promise<void>;

  abstract deleteMember(id: MemberDomain['userId']): Promise<void>;

  abstract getMembersCount(): Promise<number>;

  abstract getMembersHistory(): Promise<MemberDomain[]>;
}
