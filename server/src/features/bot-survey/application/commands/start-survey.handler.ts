import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { StartSurveyCommand } from '@features/bot-survey/application/commands/start-survey.command';
import { SurveyMessageDomain } from '@features/bot-survey/domain/survey-message.domain';
import { StartSurveyMessageEvent } from '@features/bot-survey/domain/events/start-survey-message.event';

@CommandHandler(StartSurveyCommand)
export class StartSurveyHandler implements ICommandHandler<StartSurveyCommand, void> {
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: StartSurveyCommand) {
    const { userId } = command;

    const survey = SurveyMessageDomain.create(SurveyMessageDomain, {
      text: `Мы рады приветствовать вас на служении Церкви на Пхукете. Позвольте познакомиться с вами поближе. 
      Просим вас уделить несколько минут для ответа на небольшую анкету, чтобы наше служение вам было более эффективным.`,
    });

    this.eventBus.publish(new StartSurveyMessageEvent(userId, survey));
  }
}
