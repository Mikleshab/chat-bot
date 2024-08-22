import { Global, Module } from '@nestjs/common';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { CollectionService } from '@libs/firebase/services/collection.service';

export const COLLECTION_DIRECTOR = 'CollectionDirector';

@Global()
@Module({
  providers: [
    FirebaseService,
    {
      provide: COLLECTION_DIRECTOR,
      useFactory: (firebaseService: FirebaseService) => {
        return new CollectionService(firebaseService);
      },
      inject: [FirebaseService],
    },
  ],
  exports: [COLLECTION_DIRECTOR, FirebaseService],
})
export class FirebaseModule {}
