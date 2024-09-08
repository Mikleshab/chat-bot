import { Field, ObjectType } from '@nestjs/graphql';
import { MessageObject } from '@features/consultant/presenters/graphql/dto/message.object';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { ConversationMessageMapper } from '@features/consultant/presenters/graphql/mappers/conversation-message.mapper';
import { PageInfo } from '@features/consultant/presenters/graphql/dto/page-info.object';

@ObjectType()
export class MessageEdge {
  @Field(() => String, { description: 'Cursor for this edge.' })
  cursor: string;

  @Field(() => MessageObject, { description: 'The message object for this edge.' })
  node: MessageObject;

  constructor(cursor: string, node: ConversationMessage) {
    this.cursor = cursor;
    this.node = ConversationMessageMapper.toObjectType(node);
  }
}

@ObjectType()
export class MessageConnection {
  @Field(() => [MessageEdge], { description: 'A list of edges.' })
  edges: MessageEdge[];

  @Field(() => PageInfo, { description: 'Pagination related information.' })
  pageInfo: PageInfo;

  constructor(edges: MessageEdge[], pageInfo: PageInfo) {
    this.edges = edges;
    this.pageInfo = pageInfo;
  }
}
