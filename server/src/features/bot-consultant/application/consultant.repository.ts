import { QuestionDomain } from '@features/bot-consultant/domain/question.domain';

export abstract class ConsultantRepository {
  abstract saveQuestion(question: QuestionDomain): Promise<void>;
}
