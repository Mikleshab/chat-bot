import { Injectable } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { google, sheets_v4 } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { GoogleConfiguration } from '../config';

@Injectable()
export class GoogleSheetsService {
  private sheets!: sheets_v4.Sheets;
  private readonly spreadsheetId: string;

  constructor(
    private readonly authService: GoogleAuthService,
    configService: ConfigService<GoogleConfiguration>
  ) {
    this.spreadsheetId = configService.get<string>('spreadsheetId', '');
  }

  async initSheets(): Promise<void> {
    const auth = this.authService.getAuthClient();
    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async read(sheetName: string, range: string): Promise<any[][]> {
    const fullRange = `${sheetName}!${range}`; // Укажите имя листа и диапазон

    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: fullRange,
    });

    return response.data.values || [];
  }
}
