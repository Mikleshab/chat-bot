import { UserDomain } from '@features/consultant/domain/models/user.domain';
import { UserObject } from '@features/consultant/presenters/graphql/dto/user.object';

export class UserMapper {
  static toObjectType(user: UserDomain): UserObject {
    return new UserObject(user.userId, user.username, user.fullName, user.country);
  }
}
