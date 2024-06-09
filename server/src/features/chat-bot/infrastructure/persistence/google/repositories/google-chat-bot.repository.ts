import { GoogleSheetsService } from '../services';
import { ConfigService } from '@nestjs/config';
import { GoogleConfiguration } from '../config';
import { Provider } from '@nestjs/common';
import { ChatBotRepository } from '../../../../application/ports/chat-bot.repository';
import { GoogleFormsService } from '../services/google-forms.service';

export const GOOGLE_CHAT_BOT_PROVIDER: Provider = {
  provide: ChatBotRepository,
  useFactory: (
    sheetsService: GoogleSheetsService,
    formsService: GoogleFormsService,
    configService: ConfigService<GoogleConfiguration>
  ) => {
    return new GoogleChatBotRepository(sheetsService, formsService, configService);
  },
  inject: [GoogleSheetsService, GoogleFormsService, ConfigService]
};

export class GoogleChatBotRepository implements ChatBotRepository {
  constructor(
    private readonly googleSheetsService: GoogleSheetsService,
    private readonly googleFormsService: GoogleFormsService,
    private readonly configService: ConfigService<GoogleConfiguration>
  ) {}

  async getWelcomeText(): Promise<string[]> {
    const sheetName = this.configService.get<string>('greetingsSheetName', '');
    const range = this.configService.get<string>('greetingsSheetRange', '');
    const data = await this.googleSheetsService.read(sheetName, range);
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data[0].map(value => value?.toString() || '');
  }

  async getFormLink(): Promise<{
    title: string;
    url: string
  }> {
    const formData = await this.googleFormsService.get();
    const formShortId = this.configService.get<string>('formShortId', '');

    const url = `https://forms.gle/${formShortId}`;


    return {
      title: formData.info?.description || '',
      url
    };
  }

}
