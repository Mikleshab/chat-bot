import { UserDomain } from '@features/bot-consultant/domain/user.domain';

export class UserMapper {
  static toDocData(user: UserDomain) {
    return {
      userId: user.userId,
      username: user.username,
      fullName: user.fullName,
      country: user.country,
    };
  }
}
