import { Module } from '@nestjs/common';
import { GroupStatisticsModule } from '@features/group-statistics/group-statistics.module';
import { BotMenuModule } from '@features/bot-menu/bot-menu.module';
import { WelcomeMessageModule } from '@features/welcome-message/welcome-message.module';
import { LocationsMessageModule } from '@features/locations-message/locations-message.module';
import { AccidentMessageModule } from '@features/accident-message/accident-message.module';
import { StartPrivateChatMessageModule } from '@features/start-private-chat-message/start-private-chat-message.module';
import { BotConsultantModule } from '@features/bot-consultant/bot-consultant.module';
import { BotSurveyModule } from '@features/bot-survey/bot-survey.module';
import { ChatAnnouncementsModule } from '@features/chat-announcements/chat-announcements.module';
import { TelegrafModule } from '@features/chat-bot/infrastructure/telegraf/telegraf.module';
import { ChatEventsModule } from '@features/chat-events/chat-events.module';
import { ChatBotModule } from '@features/chat-bot/chat-bot.module';

@Module({
  imports: [
    WelcomeMessageModule,
    LocationsMessageModule,
    AccidentMessageModule,
    StartPrivateChatMessageModule,
    BotMenuModule,
    BotConsultantModule,
    BotSurveyModule,
    GroupStatisticsModule,
    ChatAnnouncementsModule,
    TelegrafModule,
    ChatEventsModule,
    ChatBotModule,
  ],
})
export class FeaturesModule {}
