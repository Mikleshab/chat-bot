import { createInstance } from '../../../../common/functions/create-instance';
import { UserDomain } from '../user.domain';
import { ClientMessageCreatedCommand } from '@features/bot-consultant/application/commands/client-message-created.command';

export class UserFactory {
  static createClient(command: ClientMessageCreatedCommand): UserDomain {
    const { userId, username, country, firstname, lastname } = command;

    return new UserDomain(userId, username, `${firstname} ${lastname}`, country);
  }

  static createConsultant(): UserDomain {
    return new UserDomain(1, `Consultant`, `Михаил`, `TH`);
  }

  static load(data: object): UserDomain {
    return createInstance(UserDomain, data);
  }
}
