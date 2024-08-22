import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ConversationState } from '@features/bot-consultant/domain/value-objects/conversation-state';
import { UserObject } from '@features/bot-consultant/presenters/graphql/dto/client.object';
import { MessageObject } from '@features/bot-consultant/presenters/graphql/dto/message.object';

/**
 * Enum representing the different states a conversation can be in.
 * A conversation can have multiple states such as `ACTIVE`, `CLOSED`, or `PENDING`.
 * These states help define the current status and behavior of the conversation.
 */
registerEnumType(ConversationState, {
  name: 'ConversationState',
  description: 'Represents the state of a conversation',
});

/**
 * Represents a conversation between a client and the system.
 *
 * This object holds key information about a conversation, including the title,
 * state, registration date, client involvement, and the messages exchanged.
 *
 * The `state` field indicates the current status of the conversation, such as
 * whether it is active or closed. The `registered` field stores the date when the
 * conversation was created, represented as a timestamp.
 *
 * The conversation tracks the total number of messages (`messagesCount`) and
 * the client's activity level (`activity`). The client involved in the conversation
 * is represented by both `clientId` (a unique identifier) and a detailed `client`
 * object, which provides further information about the participant.
 *
 * The `messages` field contains a list of `MessageObject` instances, representing
 * the chat history within the conversation.
 */
@ObjectType('ConversationObject', { description: 'Represents a conversation between a client and the system.' })
export class ConversationObject {
  @Field(() => String, { description: 'The title of the conversation.' })
  title: string;

  @Field(() => ConversationState, { description: 'The current state of the conversation.' })
  state: ConversationState;

  @Field(() => Number, { description: 'The registration date of the conversation, represented as a timestamp.' })
  registered: number;

  @Field(() => Number, { description: 'The total number of messages sent by the client in the conversation.' })
  messagesCount: number;

  @Field(() => Number, { description: 'The activity level of the client in the conversation.' })
  activity: number;

  @Field(() => UserObject, { description: 'The client involved in the conversation.' })
  client: UserObject;

  @Field(() => [MessageObject], {
    description: 'The list of messages exchanged during the conversation.',
    defaultValue: [],
  })
  messages!: MessageObject[];

  constructor(
    title: string,
    state: ConversationState,
    registered: number,
    messagesCount: number,
    activity: number,
    user: UserObject,
  ) {
    this.title = title;
    this.state = state;
    this.registered = registered;
    this.messagesCount = messagesCount;
    this.activity = activity;
    this.client = user;
  }
}
