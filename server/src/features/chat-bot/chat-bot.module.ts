import { Module, OnModuleInit } from '@nestjs/common';
import { Bot } from './domain/models/bot';
import { TelegrafModule } from './infrastructure/telegraf/telegraf.module';
import { CqrsModule } from '@nestjs/cqrs';
import { TasksService } from '@features/chat-bot/application/tasks/event-task.service';

@Module({
  imports: [CqrsModule, TelegrafModule],
  providers: [Bot, TasksService],
})
export class ChatBotModule implements OnModuleInit {
  constructor(private readonly bot: Bot) {}

  onModuleInit() {
    this.bot.start();
  }
}
