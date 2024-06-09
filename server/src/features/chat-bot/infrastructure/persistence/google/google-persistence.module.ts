import { Module, OnModuleInit } from '@nestjs/common';
import { GOOGLE_CHAT_BOT_PROVIDER } from './repositories';
import { GoogleAuthService, GoogleSheetsService } from './services';
import { GoogleConfigInitializer } from './config';
import { ChatBotRepository } from '../../../application/ports/chat-bot.repository';
import { GoogleFormsService } from './services/google-forms.service';

@Module({
  providers: [
    GoogleAuthService,
    GoogleSheetsService,
    GoogleFormsService,
    GOOGLE_CHAT_BOT_PROVIDER,
  ],
  imports: [GoogleConfigInitializer],
  exports: [ChatBotRepository]
})
export class GooglePersistenceModule implements OnModuleInit {
  constructor(
    private readonly googleService: GoogleAuthService,
    private readonly googleSheetsService: GoogleSheetsService,
    private readonly googleFormsService: GoogleFormsService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.googleService.authenticate();
    await this.googleSheetsService.initSheets();
    await this.googleFormsService.initForms();
  }
}
