import { Pipe, PipeTransform } from "@angular/core";
import { DateTime } from "luxon";

@Pipe({
  name: "timeAgo",
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | number): string {
    if (!value) {
      return "";
    }

    const now = DateTime.now();
    const time = DateTime.fromJSDate(new Date(value)).setLocale("ru");

    const diffInHours = now.diff(time, "hours").hours;

    if (diffInHours < 12) {
      return time.toRelative({ locale: "ru", base: now }) || "только что";
    }

    return time.toFormat("cccc, dd MMMM yyyy, HH:mm");
  }
}
