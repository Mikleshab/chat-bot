import { TelegramMessage } from '@libs/telegram-message/types/telegram-message.class';
import { QuestionsFactory, SurveyMessageKeyboard } from '@features/bot-survey/domain/factory/questions.factory';

export class SurveyMessageDomain extends TelegramMessage {
  keyboards = [
    QuestionsFactory.question1(),
    QuestionsFactory.question2(),
    QuestionsFactory.question3(),
    QuestionsFactory.question4(),
    QuestionsFactory.question5(),
  ];

  isLastQuestion(questionIndex: number): boolean {
    return this.keyboards.length === questionIndex;
  }

  getQuestion(questionIndex: number) {
    return this.keyboards[questionIndex];
  }

  getAnswer(question: SurveyMessageKeyboard, answerIndex: number) {
    return question.buttons.flat().find((button) => button.data.answerIndex === answerIndex);
  }
}
