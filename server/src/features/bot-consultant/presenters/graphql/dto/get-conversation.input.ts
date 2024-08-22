import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('GetConversationInput', { description: 'Input arguments for the GetConversation query.' })
export class GetConversationInput {
  @Field(() => String, { description: 'The unique identifier of the client.' })
  @IsString({ message: 'Client ID must be a string.' })
  @IsNotEmpty({ message: 'Client ID must not be empty.' })
  clientId!: string;
}
