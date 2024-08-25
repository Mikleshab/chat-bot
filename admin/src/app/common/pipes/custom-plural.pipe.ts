import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customPlural",
  standalone: true
})
export class CustomPluralPipe implements PipeTransform {

  transform(value: number, one: string, few: string, many: string): string {
    if (value === 1) {
      return `${value} ${one}`;
    } else if (value >= 2 && value <= 4 || (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 12 || value % 100 > 14))) {
      return `${value} ${few}`;
    } else {
      return `${value} ${many}`;
    }
  }

}
