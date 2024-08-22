import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { NotificationEvent } from '@features/bot-consultant/domain/events/notification.event';
import { Notification } from '@features/bot-consultant/domain/value-objects/notification';
import { ConsultantService } from '@features/bot-consultant/application/consultant.service';
import { ClientMessageCreatedCommand } from '@features/bot-consultant/application/commands/client-message-created.command';
import { UserFactory } from '@features/bot-consultant/domain/factories/user.factory';
import { MessageFactory } from '@features/bot-consultant/domain/factories/message.factory';
import { MessageRepository } from '@features/bot-consultant/application/message.repository';

@CommandHandler(ClientMessageCreatedCommand)
export class ClientMessageCreatedHandler implements ICommandHandler<ClientMessageCreatedCommand, void> {
  constructor(
    private readonly repository: MessageRepository,
    private readonly service: ConsultantService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ClientMessageCreatedCommand) {
    const client = UserFactory.createClient(command);

    let parentId: string | null = null;
    if (command.replyId) {
      const parent = await this.repository.getMessageByTelegramId(command.replyId);
      parentId = parent.messageId;
    }

    const message = MessageFactory.createClientMessage(command, client, parentId);

    await this.service.saveClientMessage(message);

    const notification = Notification.create(Notification, {
      text: `Сообщение сохранено.`,
    });

    this.eventBus.publish(new NotificationEvent(client.userId, notification));
  }
}
