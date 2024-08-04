import { ICommand } from '@nestjs/cqrs';

export class StartSurveyCommand implements ICommand {
  constructor(public readonly userId: number) {}
}
