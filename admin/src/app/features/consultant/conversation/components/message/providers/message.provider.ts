import { InjectionToken, Provider } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Message } from "../../../types/conversation.type";

export const MESSAGE = new InjectionToken<BehaviorSubject<Message | null>>(`Message`);

export const MESSAGE_PROVIDER: Provider = {
  provide: MESSAGE,
  useFactory: () => new BehaviorSubject<Message | null>(null)
};