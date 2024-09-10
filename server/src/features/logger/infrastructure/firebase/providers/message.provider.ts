import { LoggerRepository } from '@features/logger/application/repositories/logger.repository';
import { FirebaseLoggerRepository } from '@features/logger/infrastructure/firebase/repositories/firebase-logger.repository';
import { FirebaseService } from '@libs/firebase/services/firebase.service';
import { Provider } from '@nestjs/common';

export const LOGGER_REPOSITORY_PROVIDER: Provider = {
  provide: LoggerRepository,
  useFactory: (firebase: FirebaseService): LoggerRepository => {
    return new FirebaseLoggerRepository(firebase);
  },
  inject: [FirebaseService],
};
