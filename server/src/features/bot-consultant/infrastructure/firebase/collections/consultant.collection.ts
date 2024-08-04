import { CollectionsDirector } from '@libs/firebase/types';
import { QuestionDomain } from '@features/bot-consultant/domain/question.domain';
import { ConsultantRepository } from '@features/bot-consultant/application/consultant.repository';

export class ConsultantCollection implements ConsultantRepository {
  constructor(private readonly director: CollectionsDirector) {}

  async saveQuestion(question: QuestionDomain): Promise<void> {
    await this.director.saveData('consultant', `${question.date}`, question);
  }
}
