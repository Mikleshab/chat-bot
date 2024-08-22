import { Injectable } from "@angular/core";
import { BehaviorSubject, switchMap } from "rxjs";
import { Message } from "../../conversation/conversation.type";
import { ReplyService } from "./reply.service";
import { OnMessageUpdatedGQL } from "../../../../graphql/generated";
import { filter, map, tap } from "rxjs/operators";

@Injectable()
export class MessageService {
  private readonly messageSubject$ = new BehaviorSubject<Message | null>(null);
  readonly message$ = this.messageSubject$.asObservable();

  constructor(
    private readonly messageUpdatedGQL: OnMessageUpdatedGQL,
    public readonly replies: ReplyService
  ) {}

  setMessage(message: Message): void {
    this.messageSubject$.next(message);
  }

  subscribeOnUpdate() {
    return this.message$.pipe(
      filter(Boolean),
      switchMap((message) => this.messageUpdatedGQL.subscribe({ input: { messageId: message.id } })),
      map((result) => result.data?.MessageUpdatedEvent),
      filter(Boolean),
      tap((message) => this.messageSubject$.next(message)),
      switchMap((message) => this.replies.refetch(message))
    );
  }
}