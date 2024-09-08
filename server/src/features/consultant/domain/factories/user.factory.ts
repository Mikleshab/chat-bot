import { UserDomain } from '../models/user.domain';
import { SaveMemberPrivateMessageCommand } from '@features/consultant/application/commands/save-member-private-message.command';

export class UserFactory {
  static createClient(member: SaveMemberPrivateMessageCommand['member']): UserDomain {
    const { id: userId, username, country, firstName, lastName } = member;

    return new UserDomain(userId, username, `${firstName} ${lastName}`, country);
  }

  static createConsultant(): UserDomain {
    return new UserDomain(1, `Consultant`, `Михаил`, `TH`);
  }
}
