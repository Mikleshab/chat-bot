import { Module, OnModuleInit } from '@nestjs/common';
import { GroupStatisticsService } from '@features/group-statistics/application/group-statistics.service';
import { TelegramStatisticsResolver } from '@features/group-statistics/presenters/graphql/resolvers/telegram-statistics.resolver';
import { FirebaseModule } from '@features/group-statistics/infrastructure/firebase/firebase.module';
import { TelegramHandler } from '@features/group-statistics/presenters/telegram/telegram.handler';
import { SaveMessageHandler } from '@features/group-statistics/application/commands/save-message.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { LeftGroupMemberHandler } from '@features/group-statistics/application/commands/left-group-member.handler';
import { NewGroupMemberHandler } from '@features/group-statistics/application/commands/new-group-member.handler';

@Module({
  providers: [
    SaveMessageHandler,
    LeftGroupMemberHandler,
    NewGroupMemberHandler,
    GroupStatisticsService,
    TelegramStatisticsResolver,
    TelegramHandler,
  ],
  imports: [CqrsModule, FirebaseModule],
})
export class GroupStatisticsModule implements OnModuleInit {
  constructor(private readonly telegramHandler: TelegramHandler) {}

  onModuleInit() {
    this.telegramHandler.listen();
  }
}
