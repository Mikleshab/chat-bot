import { CollectionsDirector } from '@libs/firebase/types';
import { SurveyRepository } from '@features/bot-survey/application/repository/survey.repository';
import { AnswerDomain } from '@features/bot-survey/domain/answer.domain';

export class SurveyCollection implements SurveyRepository {
  constructor(private readonly director: CollectionsDirector) {}

  async saveAnswer(answerDomain: AnswerDomain): Promise<void> {
    await this.director.saveData('survey', null, answerDomain);
  }
}
