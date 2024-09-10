import { NextQuestionEvent } from '@features/bot-survey/domain/events/next-question.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(NextQuestionEvent)
export class NextQuestionHandler implements IEventHandler<NextQuestionEvent> {
  // constructor(@Inject(BOT_SENDER) private readonly sender: TelegramBotSender) {}

  async handle(event: NextQuestionEvent) {
    const { userId, survey, questionIndex } = event;

    const questions = survey.getKeyboards();

    const { title, keyboard } = questions[questionIndex];
    // this.sender.sendMessage(userId, title, keyboard);
  }
}
