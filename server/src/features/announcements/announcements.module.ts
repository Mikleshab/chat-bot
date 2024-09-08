import { Module } from '@nestjs/common';
import { FirebaseModule } from './infrastructure/firefase/firebase.module';
import { AnnouncementResolver } from './presenters/graphql/resolvers/announcement.resolver';
import { GetAllAnnouncementHandler } from './application/queries/get-all-announcement.handler';
import { GetAnnouncementHandler } from './application/queries/get-announcement.handler';
import { CreateAnnouncementHandler } from './application/commands/create-announcement.handler';
import { UpdateAnnouncementHandler } from './application/commands/update-announcement.handler';
import { DeleteAnnouncementHandler } from './application/commands/delete-announcement.handler';
import { CqrsModule } from '@nestjs/cqrs';

const handlers = [
  CreateAnnouncementHandler,
  UpdateAnnouncementHandler,
  DeleteAnnouncementHandler,
  GetAnnouncementHandler,
  GetAllAnnouncementHandler,
];

@Module({
  providers: [AnnouncementResolver, ...handlers],
  imports: [CqrsModule, FirebaseModule],
})
export class AnnouncementsModule {}
