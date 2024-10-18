import { Provider } from '@nestjs/common';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { AnnouncementsRepository } from '@features/announcements/application/repositories/announcements.repository';
import { AnnouncementsCollection } from '@features/announcements/infrastructure/firefase/collections/announcements.collection';

export const ANNOUNCEMENTS_REPOSITORY_PROVIDER: Provider = {
  provide: AnnouncementsRepository,
  useFactory: (service: FirebaseService): AnnouncementsRepository => {
    return new AnnouncementsCollection(service);
  },
  inject: [FirebaseService],
};
