import {FormGroup as AngularFormGroup} from '@angular/forms';
import {AbstractControl, AbstractControlOptions} from "./abstract-control";
import {AsyncValidatorFn, ValidatorFn} from "./validator";
import {FormControl} from "./form-control";
import {FormArray, FormArrayRawValue, FormArrayValue} from "./form-array";

// Select only Optional Keys
export type OptionalKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

export type FormGroupValue<C extends {[K in keyof C]: AbstractControl<any>}> = {
    [K in keyof C]?: NonNullable<C[K]> extends FormGroup<infer U> ?
        FormGroupValue<U> :
        NonNullable<C[K]> extends FormControl<infer U> ?
            U | null :
            NonNullable<C[K]> extends FormArray<infer U> ?
                FormArrayValue<U> :
                C[K]['value']
};

export type FormGroupRawValue<C extends {[K in keyof C]: AbstractControl<any>}> = {
    [K in keyof C]: NonNullable<C[K]> extends FormGroup<infer U> ?
        FormGroupRawValue<U> :
        NonNullable<C[K]> extends FormControl<infer U> ?
            Exclude<U, null> :
            NonNullable<C[K]> extends FormArray<infer U> ?
                FormArrayRawValue<U> :
                C[K]['getRawValue']
};

export class FormGroup<C extends {[K in keyof C]: AbstractControl<any>}> extends AngularFormGroup<C> {

    public declare readonly controls: {[K in keyof C]: C[K]};

    public constructor(
        controls: C,
        validatorOrOpts?: ValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>> | ValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>>[] | AbstractControlOptions<FormGroupValue<C>, FormGroupRawValue<C>> | null,
        asyncValidator?: AsyncValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>> | AsyncValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>>[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public get rawValue(): FormGroupRawValue<C> {
        // This is correct since the raw value includes all disabled controls, and you are not able to remove any non-optional controls anymore
        return this.getRawValue() as FormGroupRawValue<C>;
    }

    public override set validator(validatorFn: ValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>> | null) {
        super.validator = validatorFn;
    }

    public override set asyncValidator(asyncValidatorFn: AsyncValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>> | null) {
        super.asyncValidator = asyncValidatorFn;
    }

    public override setValidators(validators: ValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>> | ValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>>[] | null) {
        super.setValidators(validators);
    }

    public override setAsyncValidators(validators: AsyncValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>> | AsyncValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>>[] | null) {
        super.setAsyncValidators(validators);
    }

    public override addValidators(...validators: ValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>>[]) {
        super.addValidators(validators);
    }

    public override addAsyncValidators(...validators: AsyncValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>>[]) {
        super.addAsyncValidators(validators);
    }

    public override removeValidators(...validators: ValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>>[]) {
        super.removeValidators(validators);
    }

    public override removeAsyncValidators(...validators: AsyncValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>>[]) {
        super.removeAsyncValidators(validators);
    }

    public override hasValidator(validator: ValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>>): boolean {
        return super.hasValidator(validator);
    }

    public override hasAsyncValidator(validator: AsyncValidatorFn<FormGroupValue<C>, FormGroupRawValue<C>>): boolean {
        return super.hasAsyncValidator(validator);
    }

    public override get<P extends keyof C & string>(path: P): C[P] {
        return super.get(path) as C[P];
    }

    public override registerControl<P extends OptionalKeys<C> & string>(name: P, control: C[P]): C[P] {
        return super.registerControl(name, control);
    }

    public override addControl<K extends keyof C & string>(name: K, control: Required<C>[K], options?: {
        emitEvent?: boolean
    }) {
        super.addControl(name, control, options);
    }

    public override removeControl<S extends OptionalKeys<C> & string>(name: S, options?: { emitEvent?: boolean }) {
        super.removeControl(name, options);
    }

    public override contains<S extends keyof C & string>(controlName: S): boolean {
        return super.contains(controlName);
    }
}
