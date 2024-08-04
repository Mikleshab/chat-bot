import { IsString } from 'class-validator';

export class CallbackData {
  @IsString()
  type!: string;
}
