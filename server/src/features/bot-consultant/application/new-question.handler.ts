import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { NewQuestionCommand } from '@features/bot-consultant/application/new-question.command';
import { ConsultantRepository } from '@features/bot-consultant/application/consultant.repository';
import { QuestionDomain } from '@features/bot-consultant/domain/question.domain';
import { QuestionSavedMessageEvent } from '@features/bot-consultant/domain/question-saved-message.event';
import { QuestionSavedMessageDomain } from '@features/bot-consultant/domain/question-saved-message.domain';

@CommandHandler(NewQuestionCommand)
export class NewQuestionHandler implements ICommandHandler<NewQuestionCommand, void> {
  constructor(
    private readonly repository: ConsultantRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: NewQuestionCommand) {
    const { userId, username, firstname, text, date } = command;

    const question = QuestionDomain.create(userId, username, firstname, text, date);

    await this.repository.saveQuestion(question);

    const message = QuestionSavedMessageDomain.create(QuestionSavedMessageDomain, { text: `Ваш вопрос сохранён.` });

    this.eventBus.publish(new QuestionSavedMessageEvent(userId, message));
  }
}
