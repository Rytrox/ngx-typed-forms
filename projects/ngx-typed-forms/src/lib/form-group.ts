import {FormGroup as AngularFormGroup} from '@angular/forms';
import {AbstractControl, AbstractControlOptions} from "./abstract-control";
import {Observable} from 'rxjs';
import {AsyncValidatorFn, ValidatorFn} from "./validator";

// FormGroupValue
type FormGroupValue<T> = {[K in keyof T]: AbstractControl<any>};

// Select only Optional Keys
type OptionalKeys<T extends object> = {
    [K in keyof T as undefined extends T[K] ? K : never]?: T[K]
}

export type Controls<T> = {
    [K in keyof T]-?: AbstractControl<T[K] | null, Required<T>[K]>;
};

export type FormValue<T> = Partial<{[K in keyof T]: T[K]}>;

export class FormGroup<T extends {[K in keyof T]: T[K]}> extends AngularFormGroup<FormGroupValue<T>> implements AbstractControl<Partial<{ [K in keyof T]: T[K]; }>, T> {

    declare readonly value: FormValue<T>;
    declare readonly controls: Controls<T>;
    declare readonly valueChanges: Observable<FormValue<T>>;

    public constructor(
        controls: FormGroupValue<T>,
        validatorOrOpts?: ValidatorFn<T, Required<T>> | ValidatorFn<T, Required<T>>[] | AbstractControlOptions<T> | null,
        asyncValidator?: AsyncValidatorFn<T, Required<T>> | AsyncValidatorFn<T, Required<T>>[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public override setValue(value: T, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        super.setValue(value, options);
    }

    public override patchValue(value: Partial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        super.patchValue(value, options);
    }

    public override reset(value?: Partial<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        super.reset(value, options);
    }

    public override get<P extends keyof T>(path: P): AbstractControl<T[P] | null> | null {
        return super.get(path as string | readonly (string | number)[]);
    }

    public override getRawValue(): T {
        return (super.getRawValue() as T);
    }

    public override set validator(validatorFn: ValidatorFn<T> | null) {
        super.validator = validatorFn;
    }

    public override set asyncValidator(asyncValidatorFn: AsyncValidatorFn<T> | null) {
        super.asyncValidator = asyncValidatorFn;
    }

    public override setValidators(validators: ValidatorFn<T> | ValidatorFn<T>[] | null) {
        super.setValidators(validators);
    }

    public override setAsyncValidators(validators: AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null) {
        super.setAsyncValidators(validators);
    }

    public override addValidators(validators: ValidatorFn<T> | ValidatorFn<T>[]) {
        super.addValidators(validators);
    }

    public override addAsyncValidators(validators: AsyncValidatorFn<T> | AsyncValidatorFn<T>[]) {
        super.addAsyncValidators(validators);
    }

    public override removeValidators(validators: ValidatorFn<T> | ValidatorFn<T>[]) {
        super.removeValidators(validators);
    }

    public override removeAsyncValidators(validators: AsyncValidatorFn<T> | AsyncValidatorFn<T>[]) {
        super.removeAsyncValidators(validators);
    }

    public override hasValidator(validator: ValidatorFn<T>): boolean {
        return super.hasValidator(validator);
    }

    public override hasAsyncValidator(validator: AsyncValidatorFn<T>): boolean {
        return super.hasAsyncValidator(validator);
    }

    public override registerControl<P extends keyof OptionalKeys<T> & string>(
        name: P,
        control: AbstractControl<OptionalKeys<T>[P]>
    ): AbstractControl<OptionalKeys<T>[P]> {
        return super.registerControl(name, control);
    }

    public override addControl<K extends keyof OptionalKeys<T> & string>(
        name: K,
        control: AbstractControl<OptionalKeys<T>[K]>,
        options?: {emitEvent?: boolean}
    ) {
        super.addControl(name, control, options);
    }

    public override removeControl<S extends keyof OptionalKeys<T>>(
        name: S,
        options?: {emitEvent?: boolean}
    ) {
        super.removeControl(name as string, options);
    }

    public override setControl<K extends keyof T & string>(
        name: K,
        control: AbstractControl<T[K]>,
        options?: { emitEvent?: boolean }
    ) {
        super.setControl(name, control, options);
    }
}
