import { AnalyticsModule } from '@features/analytics/analytics.module';
import { AnnouncementsModule } from '@features/announcements/announcements.module';
import { ChatBotModule } from '@features/chat-bot/chat-bot.module';
import { TelegrafModule } from '@features/chat-bot/infrastructure/telegraf/telegraf.module';
import { ConsultantModule } from '@features/consultant/consultant.module';
import { EventsModule } from '@features/events/events.module';
import { LoggerModule } from '@features/logger/logger.module';
import { Module } from '@nestjs/common';
import { ChatsModule } from '@features/chat/chats.module';

@Module({
  imports: [
    ChatsModule,
    ConsultantModule,
    AnalyticsModule,
    AnnouncementsModule,
    TelegrafModule,
    EventsModule,
    ChatBotModule,
    LoggerModule,
  ],
})
export class FeaturesModule {}
