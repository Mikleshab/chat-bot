import { ObjectType, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { ChatObject } from '@features/chat/presenters/grqphql/dto/chat.object';
import { ChatMapper } from '@features/chat/presenters/grqphql/mappers/chat.mapper';
import { Chat } from '@features/chat/domain/models/chat';
import { GetAllChatsQuery } from '@features/chat/application/queries/get-all-chats.query';

@Resolver(() => ObjectType)
export class ChatResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [ChatObject], {
    name: `getAllChats`,
    description: 'Retrieves all chat records available in the system.',
  })
  async getAll() {
    const chats = await this.queryBus.execute<GetAllChatsQuery, Chat[]>(new GetAllChatsQuery());

    return chats.map(ChatMapper.toObjectType);
  }
}
