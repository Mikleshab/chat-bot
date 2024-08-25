import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { AbstractControlValueAccessor } from "../../abstracts/control-value-accessor.class";
import { FormControlDirective } from "@coreui/angular";

@Component({
  selector: "app-textarea-input",
  standalone: true,
  imports: [ReactiveFormsModule, FormControlDirective],
  templateUrl: "./textarea-input.component.html",
  styleUrls: ["./textarea-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaInputComponent),
      multi: true
    }
  ]
})
export class TextareaInputComponent extends AbstractControlValueAccessor<string | null> implements OnChanges, AfterViewInit {
  readonly control = new FormControl("");

  get value() { return this.control.value; }

  @Output() submitted = new EventEmitter<string>();

  @Input() textareaRows = 3;
  @Input() autofocus = false;
  @Input() disabled: boolean | null = this._disabled;

  @ViewChild("textarea") textarea!: ElementRef<HTMLTextAreaElement>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["disabled"]) {
      this.setControlDisabledState(this.disabled);
    }
  }

  ngAfterViewInit() {
    if (this.autofocus && !this.disabled) {
      this.textarea.nativeElement.focus();
    }
  }

  protected writeValueToControl(value: string | null) {
    this.control.setValue(value, { emitEvent: false });
    this.adjustTextareaHeight();
  }

  protected setControlDisabledState(isDisabled: boolean | null) {
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  }

  adjustTextareaHeight() {
    const value = this.control.value || "";
    const lineCount = value.split("\n").length;
    this.textareaRows = Math.max(lineCount, 3);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "Enter") {
      this.notifyValueChange(this.value);
      this.submit();
    }
  }

  submit() {
    this.submitted.emit(this.value || "");
  }
}
