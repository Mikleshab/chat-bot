import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType({ description: 'Input type for creating an announcement' })
export class CreateAnnouncementInput {
  @Field(() => String, { description: 'The title of the announcement' })
  @IsNotEmpty({ message: 'The title field should not be empty' })
  @IsString({ message: 'The title field must be a string' })
  title!: string;

  @Field(() => String, { description: 'The text content of the announcement' })
  @IsNotEmpty({ message: 'The text field should not be empty' })
  @IsString({ message: 'The text field must be a string' })
  text!: string;

  @Field(() => Number, { description: 'The unique identifier of the chat where the announcement will be added' })
  @IsInt({ message: 'The chat ID must be an integer value' })
  chatId!: number;
}
