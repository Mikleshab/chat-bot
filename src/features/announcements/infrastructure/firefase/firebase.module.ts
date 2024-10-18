import { Module } from '@nestjs/common';
import { ANNOUNCEMENTS_REPOSITORY_PROVIDER } from './providers/announcements.provider';
import { AnnouncementsRepository } from '@features/announcements/application/repositories/announcements.repository';

@Module({
  providers: [ANNOUNCEMENTS_REPOSITORY_PROVIDER],
  exports: [AnnouncementsRepository],
})
export class FirebaseModule {}
