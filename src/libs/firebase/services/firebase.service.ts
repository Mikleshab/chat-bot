import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SecretsService } from '@libs/aws/secrets.service';

@Injectable()
export class FirebaseService {
  public app!: admin.app.App;

  constructor(private readonly secretsService: SecretsService) {}

  async init() {
    const secret = await this.secretsService.getSecret('prod/Forebase');

    this.app = admin.initializeApp({
      credential: admin.credential.cert(secret as admin.ServiceAccount),
    });
  }
}
