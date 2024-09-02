import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType({ description: 'Input type for deleting an announcement by ID' })
export class DeleteAnnouncementInput {
  @Field(() => ID, { description: 'The unique identifier of the announcement' })
  @IsString({ message: 'The ID must be a string' })
  id!: string;
}
