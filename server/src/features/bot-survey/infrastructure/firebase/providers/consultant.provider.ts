import { SurveyRepository } from '@features/bot-survey/application/repository/survey.repository';
import { SurveyCollection } from '@features/bot-survey/infrastructure/firebase/collections/survey.collection';
import { Provider } from '@nestjs/common';

export const SURVEY_REPOSITORY_PROVIDER: Provider = {
  provide: SurveyRepository,
  useFactory: (): SurveyRepository => {
    return new SurveyCollection();
  },
  inject: [],
};
