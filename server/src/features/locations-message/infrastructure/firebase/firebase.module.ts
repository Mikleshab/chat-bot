import { Module } from '@nestjs/common';
import { LOCATIONS_MESSAGE_REPOSITORY_PROVIDER } from '@features/locations-message/infrastructure/firebase/providers/message.provider';
import { LocationsMessageRepository } from '@features/locations-message/application/locations-message.repository';

@Module({
  providers: [LOCATIONS_MESSAGE_REPOSITORY_PROVIDER],
  exports: [LocationsMessageRepository],
})
export class FirebaseModule {}
