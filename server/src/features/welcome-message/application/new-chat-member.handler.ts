import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { NewChatMemberCommand } from '@features/welcome-message/application/new-chat-member.command';
import { WelcomeMessageEvent } from '@features/welcome-message/domain/welcome-message.event';
import { WelcomeMessageService } from '@features/welcome-message/application/welcome-message.service';

@CommandHandler(NewChatMemberCommand)
export class NewChatMemberHandler implements ICommandHandler<NewChatMemberCommand, void> {
  constructor(
    private readonly service: WelcomeMessageService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: NewChatMemberCommand) {
    const { groupId } = command;

    const message = await this.service.getMessage();

    this.eventBus.publish(new WelcomeMessageEvent(groupId, message));
  }
}
