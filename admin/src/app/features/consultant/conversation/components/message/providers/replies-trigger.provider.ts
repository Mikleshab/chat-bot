import { InjectionToken, Provider } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export const REPLIES_TRIGGER = new InjectionToken<BehaviorSubject<boolean>>(`Replies trigger`);

export const REPLIES_TRIGGER_PROVIDER: Provider = {
  provide: REPLIES_TRIGGER,
  useFactory: () => new BehaviorSubject<boolean>(false)
};