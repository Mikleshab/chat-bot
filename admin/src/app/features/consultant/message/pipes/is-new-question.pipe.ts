import { Pipe, PipeTransform } from "@angular/core";
import { DateTime } from "luxon";
import { Message } from "../../conversation/conversation.type";

@Pipe({
  name: "isNewQuestion",
  standalone: true
})
export class IsNewQuestionPipe implements PipeTransform {

  transform(message: Message): boolean {
    const messageDate = DateTime.fromMillis(message.timestamp);
    const currentDate = DateTime.now();

    return !message.parentId && currentDate.diff(messageDate, "hours").hours < 24;
  }
}
