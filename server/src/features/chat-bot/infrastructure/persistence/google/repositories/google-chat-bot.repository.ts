import { GoogleSheetsService } from '../services';
import { ConfigService } from '@nestjs/config';
import { GoogleConfiguration } from '../config';
import { Provider } from '@nestjs/common';
import { ChatBotRepository } from '../../../../application/ports/chat-bot.repository';

export const GOOGLE_CHAT_BOT_PROVIDER: Provider = {
  provide: ChatBotRepository,
  useFactory: (sheetsService: GoogleSheetsService, configService: ConfigService<GoogleConfiguration>) => {
    return new GoogleChatBotRepository(sheetsService, configService);
  },
  inject: [GoogleSheetsService, ConfigService]
};

export class GoogleChatBotRepository implements ChatBotRepository {
  constructor(
    private readonly googleSheetsService: GoogleSheetsService,
    private readonly configService: ConfigService<GoogleConfiguration>
  ) {}

  async welcome(): Promise<string[]> {
    const sheetName = this.configService.get<string>('greetingsSheetName', '');
    const range = this.configService.get<string>('greetingsSheetRange', '');
    const data = await this.googleSheetsService.read(sheetName, range);
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data[0].map(value => value?.toString() || '');
  }

}
