import { Module } from '@nestjs/common';
import { GroupStatisticsModule } from '@features/group-statistics/group-statistics.module';
import { BotMenuModule } from '@features/bot-menu/bot-menu.module';
import { WelcomeMessageModule } from '@features/welcome-message/welcome-message.module';
import { LocationsMessageModule } from '@features/locations-message/locations-message.module';
import { AccidentMessageModule } from '@features/accident-message/accident-message.module';
import { StartPrivateChatMessageModule } from '@features/start-private-chat-message/start-private-chat-message.module';
import { BotConsultantModule } from '@features/bot-consultant/bot-consultant.module';
import { BotSurveyModule } from '@features/bot-survey/bot-survey.module';

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
  ],
})
export class FeaturesModule {}
