import {
    AbstractControl as AngularAbstractControl,
    AbstractControlOptions as AngularAbstractControlOptions,
} from "@angular/forms";
import {AsyncValidatorFn, ValidatorFn} from "./validator";

export interface AbstractControlOptions<T, R extends T = T> extends AngularAbstractControlOptions {
    validators?: ValidatorFn<T, R> | ValidatorFn<T, R>[] | null;
    asyncValidators?: AsyncValidatorFn<T, R> | AsyncValidatorFn<T, R>[] | null;
}

export declare type AbstractControlRawValue<T extends AbstractControl | undefined> =
    T extends AngularAbstractControl<any, any> ?
        T['setValue'] extends (v: infer R) => void ? R : never :
        never;

export declare type AbstractControlValue<T extends AbstractControl | undefined> =
    T extends AbstractControl<any, any> ? T['value'] : never;

export interface AbstractControl<V = unknown, R extends V = V> extends AngularAbstractControl<V, R> {

    asyncValidator: AsyncValidatorFn<V, R> | null;
    validator: ValidatorFn<V, R> | null;
    readonly rawValue: R;

    setValidators(validators: ValidatorFn<V, R> | ValidatorFn<V, R>[] | null): void;

    setAsyncValidators(validators: AsyncValidatorFn<V, R> | AsyncValidatorFn<V, R>[] | null): void;

    addValidators(...validators: ValidatorFn<V, R>[]): void;

    addAsyncValidators(...validators: AsyncValidatorFn<V, R>[]): void;

    removeValidators(...validators: ValidatorFn<V, R>[]): void;

    removeAsyncValidators(...validators: AsyncValidatorFn<V, R>[]): void;

    hasValidator(validator: ValidatorFn<V, R>): boolean;

    hasAsyncValidator(validator: AsyncValidatorFn<V, R>): boolean;

    setValue(value: R, options?: object): void;

}
