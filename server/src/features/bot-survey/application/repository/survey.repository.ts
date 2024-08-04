import { AnswerDomain } from '@features/bot-survey/domain/answer.domain';

export abstract class SurveyRepository {
  abstract saveAnswer(answerDomain: AnswerDomain): Promise<void>;
}
