import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ConsultantService } from '@features/bot-consultant/application/consultant.service';
import { ConsultantMessageCreatedCommand } from '@features/bot-consultant/application/commands/consultant-message-created.command';
import { UserFactory } from '@features/bot-consultant/domain/factories/user.factory';
import { MessageFactory } from '@features/bot-consultant/domain/factories/message.factory';
import { Notification } from '@features/bot-consultant/domain/value-objects/notification';
import { NotificationEvent } from '@features/bot-consultant/domain/events/notification.event';
import { MessageRepository } from '@features/bot-consultant/application/message.repository';

@CommandHandler(ConsultantMessageCreatedCommand)
export class ConsultantMessageCreatedHandler implements ICommandHandler<ConsultantMessageCreatedCommand, void> {
  constructor(
    private readonly service: ConsultantService,
    private readonly eventBus: EventBus,
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(command: ConsultantMessageCreatedCommand) {
    const consultant = UserFactory.createConsultant(command);

    const message = MessageFactory.createConsultantMessage(command, consultant);

    await this.service.saveConsultantMessage(message, command.clientId);

    const parent = await this.messageRepository.getMessageById(command.parentId);

    if (parent.author.username !== consultant.username) {
      const notification = Notification.create(Notification, {
        text: command.text,
        replay: {
          parentTelegramId: parent.telegramMessageId,
          replayMessageId: message.messageId,
        },
      });

      this.eventBus.publish(new NotificationEvent(command.clientId, notification));
    }
  }
}
