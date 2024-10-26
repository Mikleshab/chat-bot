import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  public app: admin.app.App;

  constructor(configService: ConfigService<admin.ServiceAccount>) {
    const serviceAccount = {
      projectId: configService.get<string>('projectId'),
      clientEmail: configService.get<string>('clientEmail'),
      privateKey: configService.get<string>('privateKey'),
    };
    console.log('serviceAccount | projectId: ', serviceAccount.projectId);
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}
