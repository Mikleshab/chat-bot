import { Field, ObjectType } from '@nestjs/graphql';
import { UserObject } from '@features/bot-consultant/presenters/graphql/dto/user.object';

/**
 * Represents a chat message within a conversation.
 * This object holds information about a single message, including
 * its content, the author, and any replies associated with it.
 *
 * Each message has a unique identifier (`id`), a timestamp (`timestamp`)
 * indicating when it was created, and a `content` field storing the actual
 * message text. The message can optionally reply to another message, indicated
 * by the `parentId` field. Additionally, the `replyCount` tracks how many
 * replies this message has received, and the `replies` field contains a list
 * of those reply messages.
 *
 * The `authorId` and `author` fields represent the author of the message, with
 * `authorId` being the unique identifier and `author` being the associated
 * `ClientObject` that contains the author's information.
 */
@ObjectType('MessageObject', { description: 'Represents a chat message within a conversation.' })
export class MessageObject {
  @Field(() => Number, { description: 'Unique identifier of the message.' })
  id!: number;

  @Field(() => Number, { description: 'Timestamp indicating when the message was created.' })
  timestamp: number;

  @Field(() => String, { description: 'Content of the message.' })
  content: string;

  @Field(() => Number, {
    description:
      'Unique identifier of the message this message is replying to. Nullable if there is no parent message.',
    nullable: true,
  })
  parentId: number | null;

  @Field(() => Number, { description: 'The number of replies to this message.', defaultValue: 0 })
  replyCount: number;

  @Field(() => UserObject, { description: 'The author of the message.' })
  author: UserObject;

  @Field(() => [MessageObject], {
    description: 'A list of messages that are replies to this message.',
    defaultValue: [],
  })
  replies!: MessageObject[];

  constructor(
    id: number,
    user: UserObject,
    timestamp: number,
    content: string,
    parentId: number | null,
    replyCount: number,
  ) {
    this.id = id;
    this.author = user;
    this.timestamp = timestamp;
    this.content = content;
    this.parentId = parentId;
    this.replyCount = replyCount;
  }
}
