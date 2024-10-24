import {AbstractControlOptions, AsyncValidatorFn, FormGroup as AngularFormGroup, ValidatorFn} from '@angular/forms';
import {
    AbstractControl,
} from "./abstract-control";
import {Observable} from "rxjs";

// Select only Optional Keys
export type OptionalKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

type TForm<T extends {[K in keyof T]: T[K]}> = {
    [K in keyof T]: undefined extends T[K] ? AbstractControl<any, Exclude<T[K], undefined>> | undefined : AbstractControl<any, T[K]>
};

export class FormGroup<T extends {[K in keyof T]: T[K]}> extends AngularFormGroup<TForm<T>> implements AbstractControl<Partial<T>, T> {

    public declare readonly controls: TForm<T>;
    public declare readonly value: Partial<T>;
    public declare readonly valueChanges: Observable<Partial<T>>;

    public constructor(
        controls: TForm<T>,
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public get rawValue(): T {
        return this.getRawValue();
    }

    // This is correct since the raw value includes all disabled controls, and you are not able to remove any non-optional controls anymore
    public override getRawValue(): T {
        return super.getRawValue() as T;
    }

    public override setValue(value: T, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        super.setValue(value, options);
    }

    public override set validator(validatorFn: ValidatorFn | null) {
        super.validator = validatorFn;
    }

    public override set asyncValidator(asyncValidatorFn: AsyncValidatorFn | null) {
        super.asyncValidator = asyncValidatorFn;
    }

    public override setValidators(validators: ValidatorFn | ValidatorFn[] | null): void {
        super.setValidators(validators);
    }

    public override setAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[] | null): void {
        super.setAsyncValidators(validators);
    }

    public override addValidators(...validators: ValidatorFn[]): void {
        super.addValidators(validators);
    }

    public override addAsyncValidators(...validators: AsyncValidatorFn[]): void {
        super.addAsyncValidators(validators);
    }

    public override removeValidators(...validators: ValidatorFn[]): void {
        super.removeValidators(validators);
    }

    public override removeAsyncValidators(...validators: AsyncValidatorFn[]): void {
        super.removeAsyncValidators(validators);
    }

    public override hasValidator(validator: ValidatorFn): boolean {
        return super.hasValidator(validator);
    }

    public override hasAsyncValidator(validator: AsyncValidatorFn): boolean {
        return super.hasAsyncValidator(validator);
    }

    public override get<P extends keyof T & string>(path: P): this['controls'][P] {
        return super.get(path) as this['controls'][P];
    }

    public override registerControl<P extends OptionalKeys<T> & string>(name: P, control: NonNullable<this['controls'][P]>): NonNullable<this['controls'][P]> {
        return super.registerControl(name, control) as NonNullable<this['controls'][P]>;
    }

    public override addControl<K extends keyof T & string>(name: K, control: NonNullable<this['controls'][K]>, options?: {
        emitEvent?: boolean
    }) {
        super.addControl(name, control, options);
    }

    public override removeControl<S extends OptionalKeys<T> & string>(name: S, options?: { emitEvent?: boolean }): void {
        super.removeControl(name, options);
    }

    public override contains<S extends keyof T & string>(controlName: S): boolean {
        return super.contains(controlName);
    }
}
