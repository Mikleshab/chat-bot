import { UserDomain } from '@features/bot-consultant/domain/user.domain';
import { UserFactory } from '@features/bot-consultant/domain/factories/user.factory';

export class UserMapper {
  static toDocData(user: UserDomain) {
    return {
      userId: user.userId,
      username: user.username,
      fullName: user.fullName,
      country: user.country,
    };
  }

  static toDomain(doc: any) {
    return UserFactory.load(doc);
  }
}
