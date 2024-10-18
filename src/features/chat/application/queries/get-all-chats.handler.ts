import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllChatsQuery } from '@features/chat/application/queries/get-all-chats.query';
import { Chat } from '@features/chat/domain/models/chat';
import { ChatRepository } from '@features/chat/application/repositories/chat.repository';

@QueryHandler(GetAllChatsQuery)
export class GetAllChatsHandler implements IQueryHandler<GetAllChatsQuery> {
  constructor(private readonly repository: ChatRepository) {}

  async execute(): Promise<Chat[]> {
    return this.repository.getAll();
  }
}
