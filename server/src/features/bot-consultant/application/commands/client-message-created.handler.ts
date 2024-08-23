import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Notification } from '@features/bot-consultant/domain/value-objects/notification';
import { ConsultantService } from '@features/bot-consultant/application/consultant.service';
import { ClientMessageCreatedCommand } from '@features/bot-consultant/application/commands/client-message-created.command';
import { UserFactory } from '@features/bot-consultant/domain/factories/user.factory';
import { MessageFactory } from '@features/bot-consultant/domain/factories/message.factory';
import { TelegramRepository } from '@features/bot-consultant/application/ports/telegram.repository';

@CommandHandler(ClientMessageCreatedCommand)
export class ClientMessageCreatedHandler implements ICommandHandler<ClientMessageCreatedCommand, void> {
  constructor(
    private readonly service: ConsultantService,
    private readonly telegramRepository: TelegramRepository,
  ) {}

  async execute(command: ClientMessageCreatedCommand) {
    const client = UserFactory.createClient(command);

    const message = MessageFactory.createClientMessage(command, client);

    await this.service.saveClientMessage(message);

    const notification = Notification.create(Notification, {
      text: `Сообщение сохранено.`,
    });

    await this.telegramRepository.sendMessage(client, notification, command.userId, null);
  }
}
