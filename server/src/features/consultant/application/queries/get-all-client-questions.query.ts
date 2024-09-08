import { IQuery } from '@nestjs/cqrs';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';

export class GetAllClientQuestionsQuery implements IQuery {
  constructor(public readonly clientId: Conversation['client']['userId']) {}
}
