import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Bot } from './domain/models/bot';
import { TelegrafModule } from './infrastructure/telegraf/telegraf.module';
import { CqrsModule } from '@nestjs/cqrs';
import { TasksService } from '@features/chat-bot/application/tasks/event-task.service';
import { SendGreetingsMessageHandler } from '@features/chat-bot/application/commands/send-greetings-message.handler';
import { NewChatMemberSagas } from '@features/chat-bot/application/sagas/new-chat-member.sagas';
import { SaveMemberPrivateMessageSagas } from '@features/chat-bot/application/sagas/save-member-private-message.sagas';
import { NotifyMemberAboutReceivedMessageHandler } from '@features/chat-bot/application/commands/notify-member-about-received-message.handler';
import { SendMessageToMemberHandler } from '@features/chat-bot/application/commands/send-message-to-member.handler';

const handlers = [SendGreetingsMessageHandler, NotifyMemberAboutReceivedMessageHandler, SendMessageToMemberHandler];
const sagas = [NewChatMemberSagas, SaveMemberPrivateMessageSagas];

@Module({
  imports: [CqrsModule, TelegrafModule],
  providers: [...handlers, ...sagas, Bot, TasksService],
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
