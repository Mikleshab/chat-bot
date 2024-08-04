import { MenuPayloadDto } from '@libs/telegram-bot/services/bot-callback.service';
import { CallbackData } from '@libs/telegram-bot/types/callback-data.type';
import { IsNumber, IsString } from 'class-validator';
import { SurveyActions } from '@libs/bot-survey/types/survey-actions.enum';

export class SurveyCallbackDto extends CallbackData {
  @IsString()
  type = 'survey';

  @IsString()
  actions!: SurveyActions[];

  @IsNumber()
  questionIndex!: number;

  @IsNumber()
  answerIndex!: number;
}

export const isSurveyCallback = (data: MenuPayloadDto): data is SurveyCallbackDto => data.type === 'survey';
