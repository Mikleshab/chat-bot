import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('GetRepliesInput', { description: 'Input arguments for the getReplies query.' })
export class GetRepliesInput {
  @Field(() => String, { description: 'The unique identifier of the message.' })
  @IsString({ message: 'Message ID must be a string.' })
  messageId!: string;

  @Field(() => String, { nullable: true, description: 'The cursor to start fetching messages after.' })
  @IsOptional()
  @IsString({ message: 'Cursor must be a string.' })
  after?: string;

  @Field(() => Number, { nullable: true, description: 'The number of messages to return.' })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'Limit must be a positive number.' })
  first?: number;
}
