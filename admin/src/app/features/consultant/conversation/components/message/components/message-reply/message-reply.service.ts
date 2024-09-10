import { inject, Injectable } from "@angular/core";
import { startWith, Subject } from "rxjs";
import { MessageService } from "../../message.service";
import { CreateConsultantReplyGQL } from "src/app/graphql/generated";
import { map, shareReplay, switchMap } from "rxjs/operators";
import { Message } from "../../../../types/conversation.type";
import { CLIENT_ID } from "../../../../providers/conversation-client.provider";

@Injectable()
export class MessageReplyService {
  private readonly parent = inject(MessageService);
  private readonly clientId = inject(CLIENT_ID);
  private readonly createConsultantReplyGQL = inject(CreateConsultantReplyGQL);
  private readonly reply$ = new Subject<{
    text: Message["content"],
  }>();
  private readonly result$ = this.reply$.pipe(
    switchMap(({ text }) =>
      this.createConsultantReplyGQL.mutate({
        input: {
          parentId: this.parent.target.getValue()?.id!,
          content: text, clientId: this.clientId.getValue()!
        }
      }, { errorPolicy: "all" })
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly loading$ = this.result$.pipe(
    startWith({ loading: false }),
    map((result) => !!result.loading)
  );

  readonly errors$ = this.result$.pipe(
    map((result) => result.errors?.map(({ message }) => message))
  );

  readonly complete$ = this.result$.pipe(
    map(({ data }) => data?.createConsultantReply)
  );

  sendReply(text: Message["content"]) {
    this.reply$.next({ text });
  }
}