import { MenuButton } from '@libs/bot-menu/types/buttons';
import { MenuActions } from '@libs/bot-menu/types/menu-actions.enum';

export class ButtonsFactory {
  static locationsButton() {
    return new MenuButton(`Адреса`, MenuActions.GET_LOCATIONS);
  }

  static accidentButton() {
    return new MenuButton(`Безопасность`, MenuActions.ACCIDENT);
  }

  static surveyButton() {
    return new MenuButton(`Опрос`, MenuActions.SURVEY);
  }

  static askQuestionButton() {
    return new MenuButton(`Задать вопрос`, MenuActions.ASK);
  }
}
