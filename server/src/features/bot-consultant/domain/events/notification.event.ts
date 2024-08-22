import { IEvent } from '@nestjs/cqrs';
import { Notification } from '@features/bot-consultant/domain/value-objects/notification';
import { UserDomain } from '@features/bot-consultant/domain/user.domain';

export class NotificationEvent implements IEvent {
  constructor(
    readonly clientId: UserDomain['userId'],
    readonly notification: Notification,
  ) {}
}
