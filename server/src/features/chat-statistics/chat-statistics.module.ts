import { Module, OnModuleInit } from '@nestjs/common';
import { GroupStatisticsService } from '@features/chat-statistics/application/group-statistics.service';
import { ChatStatisticsResolver } from '@features/chat-statistics/presenters/graphql/resolvers/chat-statistics.resolver';
import { FirebaseModule } from '@features/chat-statistics/infrastructure/firebase/firebase.module';
import { TelegramHandler } from '@features/chat-statistics/presenters/telegram/telegram.handler';
import { SaveMessageHandler } from '@features/chat-statistics/application/commands/save-message.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { LeftGroupMemberHandler } from '@features/chat-statistics/application/commands/left-group-member.handler';
import { NewGroupMemberHandler } from '@features/chat-statistics/application/commands/new-group-member.handler';

@Module({
  providers: [
    SaveMessageHandler,
    LeftGroupMemberHandler,
    NewGroupMemberHandler,
    GroupStatisticsService,
    ChatStatisticsResolver,
    TelegramHandler,
  ],
  imports: [CqrsModule, FirebaseModule],
})
export class ChatStatisticsModule implements OnModuleInit {
  constructor(private readonly telegramHandler: TelegramHandler) {}

  onModuleInit() {
    this.telegramHandler.listen();
  }
}
