import { Module, OnModuleInit } from '@nestjs/common';
import { GOOGLE_CHAT_BOT_PROVIDER } from './repositories';
import { GoogleAuthService, GoogleSheetsService } from './services';
import { GoogleConfigInitializer } from './config';
import { ChatBotRepository } from '../../../application/ports/chat-bot.repository';

@Module({
  providers: [
    GoogleAuthService,
    GoogleSheetsService,
    GOOGLE_CHAT_BOT_PROVIDER,
  ],
  imports: [GoogleConfigInitializer],
  exports: [ChatBotRepository]
})
export class GooglePersistenceModule implements OnModuleInit {
  constructor(
    private readonly googleService: GoogleAuthService,
    private readonly googleSheetsService: GoogleSheetsService
  ) {}

  async onModuleInit(): Promise<void> {
    await this.googleService.authenticate();
    await this.googleSheetsService.initSheets();
  }
}
