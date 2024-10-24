import {
    AbstractControl as AngularAbstractControl, AsyncValidatorFn, ValidatorFn,
} from "@angular/forms";

export interface AbstractControl<V = unknown, R extends V = V> extends AngularAbstractControl<V, R> {

    readonly rawValue: R;

    setValidators(validators: ValidatorFn | ValidatorFn[] | null): void;

    setAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[] | null): void;

    addValidators(...validators: ValidatorFn[]): void;

    addAsyncValidators(...validators: AsyncValidatorFn[]): void;

    removeValidators(...validators: ValidatorFn[]): void;

    removeAsyncValidators(...validators: AsyncValidatorFn[]): void;

    hasValidator(validator: ValidatorFn): boolean;

    hasAsyncValidator(validator: AsyncValidatorFn): boolean;

    setValue(value: R, options?: object): void;

}
