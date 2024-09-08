import { UserDomain } from '@features/consultant/domain/models/user.domain';

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
    return new UserDomain(doc.userId, doc.username, doc.fullName, doc.country);
  }
}
