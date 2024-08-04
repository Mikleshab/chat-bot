import { Module } from '@nestjs/common';
import { SURVEY_REPOSITORY_PROVIDER } from '@features/bot-survey/infrastructure/firebase/providers/consultant.provider';
import { SurveyRepository } from '@features/bot-survey/application/repository/survey.repository';

@Module({
  providers: [SURVEY_REPOSITORY_PROVIDER],
  exports: [SurveyRepository],
})
export class FirebaseModule {}
