import { MessageKeyboardCallbackButton } from '@libs/telegram-message/types/buttons';
import { SurveyCallbackDto } from '@libs/bot-survey/types/callback.type';
import { SurveyActions } from '@libs/bot-survey/types/survey-actions.enum';

export class SurveyButton extends MessageKeyboardCallbackButton<SurveyCallbackDto> {
  constructor(text: string, actions: SurveyActions[], questionIndex: number, answerIndex: number) {
    super(text, { type: 'survey', questionIndex, answerIndex, actions });
  }
}
