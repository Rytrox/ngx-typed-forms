import {FormGroup as AngularFormGroup} from '@angular/forms';
import {AbstractControl, AbstractControlOptions} from "./abstract-control";
import {Observable} from 'rxjs';
import {AsyncValidatorFn, ValidatorFn} from "./validator";

// FormGroupValue
type FormGroupValue<T> = {[K in keyof T]: AbstractControl<any>};

// AbstractControlValue
type AbstractControlValue<T> = AbstractControl<T>['value'];

export type Controls<T> = {
    [K in keyof T]-?: AbstractControl<T[K] | null, Required<T>[K]>;
};

export type FormValue<T> = Partial<{[K in keyof T]: AbstractControlValue<T[K]>}>;

export class FormGroup<T extends {[K in keyof T]: AbstractControlValue<T[K]>}> extends AngularFormGroup<FormGroupValue<T>> implements AbstractControl<Partial<{ [K in keyof T]: T[K]; }>, Required<T>> {

    declare readonly value: FormValue<T>;
    declare readonly controls: Controls<T>;
    declare readonly valueChanges: Observable<FormValue<T>>;

    public constructor(
        controls: FormGroupValue<Required<T>>,
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

    public override get<P extends keyof T>(path: P): AbstractControl<AbstractControlValue<T[P] | null>> | null {
        return super.get(path as string | readonly (string | number)[]);
    }

    public override getRawValue(): Required<T> {
        return (super.getRawValue() as Required<T>);
    }
}
