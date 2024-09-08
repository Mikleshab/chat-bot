import { IQuery } from '@nestjs/cqrs';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';

export class GetAllConversations implements IQuery {
  constructor(public readonly filter?: { clientIds: Conversation['client']['userId'][] }) {}
}
