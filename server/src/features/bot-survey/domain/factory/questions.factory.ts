import { MessageKeyboard } from '@libs/telegram-message/types/keyboard';
import { SurveyButton } from '@libs/bot-survey/types/buttons';
import { SurveyActions } from '@libs/bot-survey/types/survey-actions.enum';
import { MessageKeyboardCallbackButton } from '@libs/telegram-message/types/buttons';
import { SurveyCallbackDto } from '@libs/bot-survey/types/callback.type';

export type SurveyMessageKeyboard = MessageKeyboard<MessageKeyboardCallbackButton<SurveyCallbackDto>>;

export class QuestionsFactory {
  static question1(): SurveyMessageKeyboard {
    return {
      title: `Вы только начинаете знакомиться с подобной церковью и на таких служениях впервые.`,
      buttons: [
        [
          new SurveyButton(`Да`, [SurveyActions.COURSE_LINK, SurveyActions.SOCIAL_NETWORKS], 0, 0),
          new SurveyButton(`Нет`, [], 0, 1),
        ],
      ],
    };
  }

  static question2(): SurveyMessageKeyboard {
    return {
      title: `Вы ходите в подобную церковь в своей стране уже более 3 лет и приехали на Пхукет для пребывания здесь более 3х месяцев.`,
      buttons: [[new SurveyButton(`Да`, [SurveyActions.SKILLS_FORM], 1, 0), new SurveyButton(`Нет`, [], 1, 1)]],
    };
  }

  static question3(): SurveyMessageKeyboard {
    return {
      title: `Вы ходите в подобную церковь в своей стране уже более 3 лет и приехали на Пхукет на срок менее 3х месяцев.`,
      buttons: [[new SurveyButton(`Да`, [SurveyActions.ACCIDENT], 2, 0), new SurveyButton(`Нет`, [], 2, 1)]],
    };
  }

  static question4(): SurveyMessageKeyboard {
    return {
      title: `Вы проживаете в районе:`,
      buttons: [
        [
          new SurveyButton(`Район 1`, [SurveyActions.SAVE_LOCATION], 3, 0),
          new SurveyButton(`Район 2`, [SurveyActions.SAVE_LOCATION], 3, 1),
        ],
        [
          new SurveyButton(`Район 3`, [SurveyActions.SAVE_LOCATION], 3, 2),
          new SurveyButton(`Район 4`, [SurveyActions.SAVE_LOCATION], 3, 3),
        ],
        [new SurveyButton(`Район 5`, [SurveyActions.SAVE_LOCATION], 3, 4)],
      ],
    };
  }

  static question5(): SurveyMessageKeyboard {
    return {
      title: `У вас есть предложение или вопрос к пастору.`,
      buttons: [[new SurveyButton(`Да`, [SurveyActions.ASK], 4, 0), new SurveyButton(`Нет`, [], 4, 1)]],
    };
  }
}
