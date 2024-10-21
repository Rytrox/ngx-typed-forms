import {
    FormArray as AngularFormArray,
    AbstractControlOptions as AngularAbstractControlOptions
} from "@angular/forms";
import {ArrayValidatorFn, AsyncArrayValidatorFn} from "./validator";
import {AbstractControl, AbstractControlRawValue, AbstractControlValue} from "./abstract-control";
import {Observable} from "rxjs";

export type FormArrayValue<C extends AbstractControl<any>> = AbstractControlValue<C>[];

export type FormArrayRawValue<C extends AbstractControl<any>> = AbstractControlRawValue<C>[];

export interface FormArrayControlType<C extends AbstractControl<any>> extends AngularAbstractControlOptions {
    validators?: ArrayValidatorFn<C> | ArrayValidatorFn<C>[] | null;
    asyncValidators?: AsyncArrayValidatorFn<C> | AsyncArrayValidatorFn<C>[] | null;
}

// @ts-expect-error This is correct, because Array<V> does not extend Array<R>, but this needs to work here, since Angular is designed to do this.
export class FormArray<C extends AbstractControl<any>> extends AngularFormArray<C> implements AbstractControl<FormArrayValue<C>, FormArrayRawValue<C>> {

    public declare readonly controls: C[];
    public declare readonly value: FormArrayValue<C>;
    public declare readonly valueChanges: Observable<FormArrayValue<C>>;

    public constructor(
        controls: C[],
        validatorOrOpts?: ArrayValidatorFn<C> | ArrayValidatorFn<C>[] | FormArrayControlType<C> | null,
        asyncValidator?: AsyncArrayValidatorFn<C> | AsyncArrayValidatorFn<C>[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public get rawValue(): FormArrayRawValue<C> {
        return this.getRawValue();
    }

    public override setValue(value: FormArrayRawValue<C>, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
        super.setValue(value, options);
    }

    public override at<K extends keyof C[] & number>(index: K): C {
        return super.at(index) as C;
    }

    public override patchValue(value: FormArrayValue<C>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        super.patchValue(value, options);
    }

    public override reset(value?: FormArrayValue<C> | null, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        super.reset(value ?? undefined, options);
    }

    public override getRawValue(): FormArrayRawValue<C> {
        return super.getRawValue();
    }

    public override set validator(validatorFn: ArrayValidatorFn<C> | null) {
        super.validator = validatorFn;
    }

    public override set asyncValidator(asyncValidatorFn: AsyncArrayValidatorFn<C> | null) {
        super.asyncValidator = asyncValidatorFn;
    }

    public override setValidators(validators: ArrayValidatorFn<C> | ArrayValidatorFn<C>[] | null) {
        super.setValidators(validators);
    }

    public override setAsyncValidators(validators: AsyncArrayValidatorFn<C> | AsyncArrayValidatorFn<C>[] | null) {
        super.setAsyncValidators(validators);
    }

    public override addValidators(...validators: ArrayValidatorFn<C>[]): void {
        super.addValidators(validators);
    }

    public override addAsyncValidators(...validators: AsyncArrayValidatorFn<C>[]): void {
        super.addAsyncValidators(validators);
    }

    public override removeValidators(...validators: ArrayValidatorFn<C>[]): void {
        super.removeValidators(validators);
    }

    public override removeAsyncValidators(...validators: AsyncArrayValidatorFn<C>[]): void {
        super.removeAsyncValidators(validators);
    }

    public override hasValidator(validator: ArrayValidatorFn<C>): boolean {
        return super.hasValidator(validator);
    }

    public override hasAsyncValidator(validator: AsyncArrayValidatorFn<C>): boolean {
        return super.hasAsyncValidator(validator);
    }
}
