import { Field, ID, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType('DeleteAnnouncementInput', { description: 'Input type for deleting an announcement by ID' })
export class DeleteAnnouncementInput {
  @Field(() => ID, { description: 'The unique identifier of the announcement' })
  @IsString({ message: 'The ID must be a string' })
  id!: string;

  @Field(() => Number, { description: 'The unique identifier of the Chat' })
  @IsInt({ message: 'The chat ID must be an integer value' })
  chatId!: number;
}
