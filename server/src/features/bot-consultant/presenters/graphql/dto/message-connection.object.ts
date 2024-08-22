import { Field, ObjectType } from '@nestjs/graphql';
import { MessageObject } from '@features/bot-consultant/presenters/graphql/dto/message.object';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { MessageMapper } from '@features/bot-consultant/presenters/graphql/mappers/message.mapper';
import { MessageEdgeMapper } from '@features/bot-consultant/presenters/graphql/mappers/message-edge.mapper';
import { PageInfo } from '@features/bot-consultant/presenters/graphql/dto/page-info.object';

@ObjectType()
export class MessageEdge {
  @Field(() => String, { description: 'Cursor for this edge.' })
  cursor: string;

  @Field(() => MessageObject, { description: 'The message object for this edge.' })
  node: MessageObject;

  constructor(cursor: string, node: MessageDomain) {
    this.cursor = cursor;
    this.node = MessageMapper.toObjectType(node);
  }
}

@ObjectType()
export class MessageConnection {
  @Field(() => [MessageEdge], { description: 'A list of edges.' })
  edges: MessageEdge[];

  @Field(() => PageInfo, { description: 'Pagination related information.' })
  pageInfo: PageInfo;

  constructor(
    messages: MessageDomain[],
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    startCursor: string | null,
    endCursor: string | null,
  ) {
    this.edges = messages.map(MessageEdgeMapper.toObjectType);
    this.pageInfo = new PageInfo(hasNextPage, hasPreviousPage, startCursor, endCursor);
  }
}
