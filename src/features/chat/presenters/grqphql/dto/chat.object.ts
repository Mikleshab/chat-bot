import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ChatObject', { description: 'Represents a chat entity.' })
export class ChatObject {
  @Field(() => Number, { description: 'The unique identifier of the chat.' })
  id: number;

  @Field(() => String, { description: 'The name or title of the chat.' })
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
