import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { Global, Module, OnModuleInit } from '@nestjs/common';
import { SecretsService } from '@libs/aws/secrets.service';

@Global()
@Module({
  providers: [FirebaseService, SecretsService],
  exports: [FirebaseService],
})
export class FirebaseModule implements OnModuleInit {
  constructor(private readonly firebaseService: FirebaseService) {}

  async onModuleInit() {
    await this.firebaseService.init();
  }
}
