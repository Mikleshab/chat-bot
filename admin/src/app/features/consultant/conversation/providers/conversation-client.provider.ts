import { InjectionToken, Provider } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ClientId } from "../types/conversation.type";

export const CLIENT_ID = new InjectionToken<BehaviorSubject<ClientId | null>>(`Client Id for Conversation`);

export const CLIENT_ID_PROVIDER: Provider = {
  provide: CLIENT_ID,
  useFactory: () => new BehaviorSubject<ClientId | null>(null)
};