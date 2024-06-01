import { Module } from '@nestjs/common';
import { ChatBotModule } from './chat-bot/application/chat-bot.module';

@Module({
  imports: [ChatBotModule],
})
export class FeaturesModule {
}
