import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
