import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType({ description: 'Input type for retrieving an announcement by ID' })
export class GetAnnouncementInput {
  @Field(() => ID, { description: 'The unique identifier of the announcement' })
  @IsString({ message: 'The ID must be a string' })
  id!: string;
}
