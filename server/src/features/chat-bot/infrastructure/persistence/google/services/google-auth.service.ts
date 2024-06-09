import { Injectable } from '@nestjs/common';
import path from 'node:path';
import { GoogleAuth, JWT } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { GoogleConfiguration } from '../config';

@Injectable()
export class GoogleAuthService {
  private authClient: JWT | undefined;

  constructor(private readonly configService: ConfigService<GoogleConfiguration>) {}

  async authenticate(): Promise<void> {
    if (this.authClient) {
      console.warn(`Google client already authenticated.`);
      return;
    }

    const KEYFILE_PATH = path.join(__dirname, this.configService.get<GoogleConfiguration['googleApplicationCredentials']>('googleApplicationCredentials', ''));

    const auth = new GoogleAuth({
      keyFile: KEYFILE_PATH,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/forms',
        'https://www.googleapis.com/auth/drive',
      ],
    });

    this.authClient = await auth.getClient() as JWT;
  }

  getAuthClient(): JWT {
    if (!this.authClient) {
      throw new Error(`Google client not authenticated.`);
    }
    return this.authClient;
  }
}
