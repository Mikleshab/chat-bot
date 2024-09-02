import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType({ description: 'Input type for updating an existing announcement' })
export class UpdateAnnouncementInput {
  @Field(() => ID, { description: 'The unique identifier of the announcement to be updated' })
  @IsString({ message: 'The ID must be a string' })
  id!: string;

  @Field(() => String, { nullable: true, description: 'The updated text content of the announcement' })
  @IsOptional()
  @IsNotEmpty({ message: 'The text field should not be empty if provided' })
  @IsString({ message: 'The text field must be a string' })
  text?: string;

  @Field(() => String, { nullable: true, description: 'The updated title content of the announcement' })
  @IsOptional()
  @IsNotEmpty({ message: 'The title field should not be empty if provided' })
  @IsString({ message: 'The title field must be a string' })
  title?: string;
}
