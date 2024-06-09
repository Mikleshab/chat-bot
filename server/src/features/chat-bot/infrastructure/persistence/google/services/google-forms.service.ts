import { Injectable } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { forms_v1, google } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { GoogleConfiguration } from '../config';

@Injectable()
export class GoogleFormsService {
  private forms!: forms_v1.Forms;
  private readonly formId: string;

  constructor(
    private readonly authService: GoogleAuthService,
    configService: ConfigService<GoogleConfiguration>
  ) {
    this.formId = configService.get<string>('formId', '');
  }

  async initForms(): Promise<void> {
    const auth = this.authService.getAuthClient();
    this.forms = google.forms({ version: 'v1', auth });
  }

  async get(): Promise<forms_v1.Schema$Form> {
    const response = await this.forms.forms.get({
      formId: this.formId,
    });

    return response.data;
  }
}
