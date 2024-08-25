import { inject, Injectable } from "@angular/core";
import { MESSAGE } from "./providers/message.provider";
import { GetMessageApi } from "./api/get-message.api";

@Injectable()
export class MessageService {
  readonly target = inject(MESSAGE);
  readonly message = inject(GetMessageApi);
}