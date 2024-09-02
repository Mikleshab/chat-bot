import { Member } from '@features/chat-bot/domain/models/member';
import { User } from '@telegraf/types/manage';

export class MemberFactory {
  static toDomain(user: User): Member {
    return new Member(
      user.id,
      user.first_name,
      user.last_name || 'unknown "last_name"',
      user.username || 'unknown "last_name"',
      user.language_code || 'unknown "country"',
    );
  }
}
