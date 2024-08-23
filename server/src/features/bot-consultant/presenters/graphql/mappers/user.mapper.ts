import { UserDomain } from '@features/bot-consultant/domain/user.domain';
import { UserObject } from '@features/bot-consultant/presenters/graphql/dto/user.object';

export class UserMapper {
  static toObjectType(user: UserDomain): UserObject {
    return new UserObject(user.userId, user.username, user.fullName, user.country);
  }
}
