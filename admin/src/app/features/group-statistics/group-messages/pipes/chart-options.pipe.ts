import { Pipe, PipeTransform } from "@angular/core";
import { ChartOptions } from "chart.js";

@Pipe({
  name: "chartOptions",
  standalone: true
})
export class ChartOptionsPipe implements PipeTransform {

  transform(history: { title: string; color: string; text: string; value: number }[]): ChartOptions {
    const values = history.map(item => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    return {
      plugins: {
        legend: {
          display: false
        }
      },
      maintainAspectRatio: false,
      scales: {
        x: {
          border: {
            display: false
          },
          grid: {
            display: false
          },
          ticks: {
            display: false
          }
        },
        y: {
          min: minValue - 10,
          max: maxValue + 10,
          display: false,
          grid: {
            display: false
          },
          ticks: {
            display: false
          }
        }
      },
      elements: {
        line: {
          borderWidth: 1,
          tension: 0.4
        },
        point: {
          radius: 4,
          hitRadius: 10,
          hoverRadius: 4
        }
      }
    };
    ;
  }

}
