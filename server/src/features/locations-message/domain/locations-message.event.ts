import { LocationsMessageDomain } from '@features/locations-message/domain/locations-message.domain';
import { IEvent } from '@nestjs/cqrs';

export class LocationsMessageEvent implements IEvent {
  constructor(
    readonly userId: number,
    readonly message: LocationsMessageDomain,
  ) {}
}
