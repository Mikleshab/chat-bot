import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { ButtonDirective, Colors, FormCheckLabelDirective, Shapes } from "@coreui/angular";
import { AsyncPipe } from "@angular/common";
import { IconDirective } from "@coreui/icons-angular";
import { AbstractControlValueAccessor } from "../../abstracts/control-value-accessor.class";

@Component({
  selector: "app-toggle-input",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonDirective,
    FormCheckLabelDirective,
    AsyncPipe,
    IconDirective
  ],
  templateUrl: "./toggle-input.component.html",
  styleUrls: ["./toggle-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleInputComponent),
      multi: true
    }
  ],
  exportAs: "appToggleInput"
})
export class ToggleInputComponent extends AbstractControlValueAccessor<boolean> {
  readonly control = new FormControl(false);

  get value() { return this.control.value; }

  @Input()
  set value(value) { this.writeValueToControl(value); }

  @Input() labelText: string = "";
  @Input() size: "sm" | "lg" | "" | undefined;
  @Input() variant: "ghost" | "outline" | undefined;
  @Input() color: Colors | undefined;
  @Input() shape: Shapes | undefined;

  @Output() switch = new EventEmitter<boolean>();

  toggle() {
    const prevValue = this.control.getRawValue();
    this.control.setValue(!prevValue);
    this.notifyValueChange(!prevValue);
  }

  on() {
    console.log("on");
    this.control.setValue(true);
    this.notifyValueChange(true);
  }

  protected writeValueToControl(value: boolean | null): void {
    this.control.setValue(value, { emitEvent: false });
  }

  protected setControlDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }
}
