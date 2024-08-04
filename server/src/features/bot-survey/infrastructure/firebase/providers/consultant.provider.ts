import { Provider } from '@nestjs/common';
import { COLLECTION_DIRECTOR } from '@libs/firebase/firebase.module';
import { CollectionsDirector } from '@libs/firebase/types';
import { SurveyRepository } from '@features/bot-survey/application/repository/survey.repository';
import { SurveyCollection } from '@features/bot-survey/infrastructure/firebase/collections/survey.collection';

export const SURVEY_REPOSITORY_PROVIDER: Provider = {
  provide: SurveyRepository,
  useFactory: (director: CollectionsDirector): SurveyRepository => {
    return new SurveyCollection(director);
  },
  inject: [COLLECTION_DIRECTOR],
};
