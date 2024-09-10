import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChatId } from "src/app/features/chat/components/events/types/chat-event.type";

export const CHAT_ID = new InjectionToken<BehaviorSubject<ChatId>>(`Chat Id for Chat`, {
  providedIn: "root",
  factory: () => new BehaviorSubject<ChatId>(-1002158314863)
});