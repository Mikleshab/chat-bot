import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { DateTime } from "luxon";

export function endDateValidator(startDateControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control?.parent?.get(startDateControlName)?.value;
    const endDate = control.value;

    if (startDate && endDate) {
      const start = DateTime.fromISO(startDate);
      const end = DateTime.fromISO(endDate);

      return end >= start ? null : { endDateBeforeStartDate: true };
    }
    return null;
  };
}
