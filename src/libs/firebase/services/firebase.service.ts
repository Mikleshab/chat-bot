import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { serviceAccount } from '@libs/firebase/credentials/church-admin-panel';

@Injectable()
export class FirebaseService {
  public readonly app: admin.app.App;

  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }
}
