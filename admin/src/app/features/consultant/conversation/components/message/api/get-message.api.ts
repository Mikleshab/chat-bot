import { inject, Injectable } from "@angular/core";
import { MESSAGE } from "../providers/message.provider";
import { MessageUpdatedWss } from "./message-updated.wss";
import { startWith, switchMap } from "rxjs";
import { filter, map, shareReplay } from "rxjs/operators";

@Injectable()
export class GetMessageApi {
  private readonly target$ = inject(MESSAGE);
  readonly updated = inject(MessageUpdatedWss);
  private readonly result$ = this.updated.data$.pipe(
    startWith(null),
    switchMap(() => this.target$),
    filter(Boolean),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly errors$ = this.updated.errors$.pipe(
    map((errors) => errors?.map(({ message }) => message))
  );

  readonly data$ = this.result$;
}