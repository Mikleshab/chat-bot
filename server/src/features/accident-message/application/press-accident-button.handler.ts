import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { PressAccidentButtonCommand } from '@features/accident-message/application/press-accident-button.command';
import { AccidentMessageRepository } from '@features/accident-message/application/accident-message.repository';
import { AccidentMessageEvent } from '@features/accident-message/domain/accident-message.event';
import { AccidentMessageDomain } from '@features/accident-message/domain/accident-message.domain';

@CommandHandler(PressAccidentButtonCommand)
export class PressAccidentButtonHandler implements ICommandHandler<PressAccidentButtonCommand, void> {
  constructor(
    private readonly repository: AccidentMessageRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: PressAccidentButtonCommand) {
    const { userId } = command;
    const json = await this.repository.getAccidentPreventions();

    const message = AccidentMessageDomain.create(AccidentMessageDomain, json);

    this.eventBus.publish(new AccidentMessageEvent(userId, message));
  }
}
