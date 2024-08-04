import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PressLocationsButtonCommand } from '@features/locations-message/application/press-locations-button.command';
import { LocationsMessageRepository } from '@features/locations-message/application/locations-message.repository';
import { LocationsMessageEvent } from '@features/locations-message/domain/locations-message.event';
import { LocationsMessageDomain } from '@features/locations-message/domain/locations-message.domain';

@CommandHandler(PressLocationsButtonCommand)
export class PressLocationsButtonHandler implements ICommandHandler<PressLocationsButtonCommand, void> {
  constructor(
    private readonly repository: LocationsMessageRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: PressLocationsButtonCommand) {
    const { userId } = command;
    const json = await this.repository.getLocations();

    const message = LocationsMessageDomain.create(LocationsMessageDomain, json);

    this.eventBus.publish(new LocationsMessageEvent(userId, message));
  }
}
