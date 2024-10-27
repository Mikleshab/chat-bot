import { NotifyMemberAboutReceivedMessageHandler } from '@features/chat-bot/application/commands/notify-member-about-received-message.handler';
import { SendGreetingsMessageHandler } from '@features/chat-bot/application/commands/send-greetings-message.handler';
import { SendMessageToMemberHandler } from '@features/chat-bot/application/commands/send-message-to-member.handler';
import { LeftChatMemberSagas } from '@features/chat-bot/application/sagas/left-chat-member.sagas';
import { NewChatMemberSagas } from '@features/chat-bot/application/sagas/new-chat-member.sagas';
import { SaveMemberMessageSagas } from '@features/chat-bot/application/sagas/save-member-message.sagas';
import { SaveMemberPrivateMessageSagas } from '@features/chat-bot/application/sagas/save-member-private-message.sagas';
import { TasksService } from '@features/chat-bot/application/tasks/event-task.service';
import { ExceptionLoggerService } from '@features/chat-bot/infrastructure/logging/exception-logger.service';
import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Bot } from './domain/models/bot';
import { TelegrafModule } from './infrastructure/telegraf/telegraf.module';
import { WebhookController } from '@features/chat-bot/presenters/rest/webhook.controller';

const handlers = [SendGreetingsMessageHandler, NotifyMemberAboutReceivedMessageHandler, SendMessageToMemberHandler];
const sagas = [NewChatMemberSagas, LeftChatMemberSagas, SaveMemberPrivateMessageSagas, SaveMemberMessageSagas];

@Module({
  imports: [CqrsModule, TelegrafModule],
  providers: [...handlers, ...sagas, Bot, TasksService, ExceptionLoggerService],
  controllers: [WebhookController],
})
export class ChatBotModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly bot: Bot) {}

  onModuleInit() {
    this.bot.start();
  }

  onModuleDestroy() {
    this.bot.stop();
  }
}
