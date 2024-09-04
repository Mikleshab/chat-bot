import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from "@angular/core";
import {
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective
} from "@coreui/angular";
import { NgComponentOutlet } from "@angular/common";

@Component({
  selector: "app-modal-card",
  standalone: true,
  imports: [
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    NgComponentOutlet
  ],
  templateUrl: "./modal-card.component.html",
  styleUrl: "./modal-card.component.scss"
})
export class ModalCardComponent {
  @Input() size: "sm" | "lg" | "xl" | undefined;

  @Input() show: boolean = true;

  @Input() title: string = "";

  @ViewChild("bodyContainer", { read: ViewContainerRef, static: true }) bodyContainer!: ViewContainerRef;

  @Output() close = new EventEmitter<void>();

  @Output() cancel = new EventEmitter<void>();
}
