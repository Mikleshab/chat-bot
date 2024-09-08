import { Module } from '@nestjs/common';
import { ChatStatisticsModule } from '@features/chat-statistics/chat-statistics.module';
import { BotMenuModule } from '@features/bot-menu/bot-menu.module';
import { ConsultantModule } from '@features/consultant/consultant.module';
import { BotSurveyModule } from '@features/bot-survey/bot-survey.module';
import { AnnouncementsModule } from '@features/announcements/announcements.module';
import { TelegrafModule } from '@features/chat-bot/infrastructure/telegraf/telegraf.module';
import { EventsModule } from '@features/events/events.module';
import { ChatBotModule } from '@features/chat-bot/chat-bot.module';

@Module({
  imports: [
    BotMenuModule,
    ConsultantModule,
    BotSurveyModule,
    ChatStatisticsModule,
    AnnouncementsModule,
    TelegrafModule,
    EventsModule,
    ChatBotModule,
  ],
})
export class FeaturesModule {}
