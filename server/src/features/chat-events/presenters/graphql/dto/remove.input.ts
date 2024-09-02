import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType({ description: 'Input data required to remove a specific chat event' })
export class RemoveChatEventInput {
  @Field(() => ID, { description: 'The unique identifier of the chat event to be removed' })
  @IsString({ message: 'The ID must be a string' })
  id!: string;
}
