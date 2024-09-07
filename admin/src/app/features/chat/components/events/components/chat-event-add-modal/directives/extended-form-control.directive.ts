import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { FormControlDirective } from "@coreui/angular"; // Замените на корректный путь до директивы CoreUI

@Directive({
  standalone: true,
  selector: "[extendedFormControl]"
})
export class ExtendedFormControlDirective extends FormControlDirective implements OnInit {
  @Input({ required: true }) override type!: string;

  constructor(private elementRef: ElementRef) {
    super(elementRef);
  }

  override ngOnInit(): void {
    if (this.type === "number" || this.type === "datetime-local") {
      this.elementRef.nativeElement.setAttribute("type", this.type);
    }
    super.ngOnInit();
  }
}
