import { Component, Input } from "@angular/core";
import { AlertComponent, ContainerComponent } from "@coreui/angular";

@Component({
  selector: "app-errors",
  standalone: true,
  imports: [
    AlertComponent,
    ContainerComponent
  ],
  templateUrl: "./errors.component.html",
  styleUrl: "./errors.component.scss"
})
export class ErrorsComponent {
  @Input() errors: string[] = [];
}
