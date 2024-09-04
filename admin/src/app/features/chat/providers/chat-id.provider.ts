import { InjectionToken, Provider } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChatId } from "../components/events/types/chat-event.type";

export const CHAT_ID = new InjectionToken<BehaviorSubject<ChatId>>(`Chat Id for Chat`);

export const CHAT_ID_PROVIDER: Provider = {
  provide: CHAT_ID,
  useFactory: () => new BehaviorSubject<ChatId>(1)
};