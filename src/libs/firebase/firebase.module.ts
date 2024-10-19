import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { Global, Module, OnModuleInit } from '@nestjs/common';

@Global()
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule implements OnModuleInit {
  constructor(private readonly firebaseService: FirebaseService) {}

  async onModuleInit() {
    await this.firebaseService.init();
  }
}
