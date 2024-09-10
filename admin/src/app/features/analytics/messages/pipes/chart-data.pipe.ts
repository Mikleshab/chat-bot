import { Pipe, PipeTransform } from "@angular/core";
import { getStyle } from "@coreui/utils";
import { ChartData } from "chart.js";

@Pipe({
  name: "chartData",
  standalone: true
})
export class ChartDataPipe implements PipeTransform {

  transform(history: { title: string; color: string; text: string; value: number }[]): ChartData {
    return {
      labels: history.map(({ title }) => title),
      datasets: history.length ? [
        {
          label: history[0].text,
          backgroundColor: "transparent",
          borderColor: "rgba(255,255,255,.55)",
          pointBackgroundColor: getStyle("--cui-primary"),
          pointHoverBorderColor: getStyle("--cui-primary"),
          data: history.map(({ value }) => value)
        }
      ] : []
    };
  }

}
