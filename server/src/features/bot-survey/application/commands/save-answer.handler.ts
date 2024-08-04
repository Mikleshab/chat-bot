import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SurveyMessageDomain } from '@features/bot-survey/domain/survey-message.domain';
import { SurveyRepository } from '@features/bot-survey/application/repository/survey.repository';
import { SaveAnswerCommand } from '@features/bot-survey/application/commands/save-answer.command';
import { AnswerDomain } from '@features/bot-survey/domain/answer.domain';

@CommandHandler(SaveAnswerCommand)
export class SaveAnswerHandler implements ICommandHandler<SaveAnswerCommand> {
  constructor(private readonly repository: SurveyRepository) {}

  async execute(command: SaveAnswerCommand) {
    const { userId, questionIndex, answerIndex } = command;

    const survey = SurveyMessageDomain.create(SurveyMessageDomain);
    const question = survey.getQuestion(questionIndex);
    const answer = survey.getAnswer(question, answerIndex);

    const answerDomain = new AnswerDomain(userId, '', '', question.title, answer?.text || '');

    await this.repository.saveAnswer(answerDomain);
  }
}
