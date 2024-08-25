import { ControlValueAccessor } from "@angular/forms";

export abstract class AbstractControlValueAccessor<T> implements ControlValueAccessor {
  protected _value: T | null = null;
  protected _disabled = false;

  protected onChange: (value: T) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: T | null): void {
    this._value = value;
    this.writeValueToControl(value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.setControlDisabledState(isDisabled);
  }

  protected abstract writeValueToControl(value: T | null): void;

  protected abstract setControlDisabledState(isDisabled: boolean): void;

  protected notifyValueChange(value: T): void {
    this.onChange(value);
  }

  protected notifyTouch(): void {
    this.onTouched();
  }
}