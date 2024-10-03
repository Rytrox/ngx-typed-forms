import {
    FormArray as AngularFormArray,
    AbstractControlOptions as AngularAbstractControlOptions,
} from "@angular/forms";
import {ArrayValidatorFn, AsyncArrayValidatorFn} from "./validator";
import {FormControl} from "./form-control";
import {FormGroup, FormGroupRawValue, FormGroupValue} from "./form-group";
import {AbstractControl} from "./abstract-control";

export type FormArrayValue<C extends AbstractControl<any>> = [
    NonNullable<C> extends FormGroup<infer U> ?
        FormGroupValue<U> :
        NonNullable<C> extends FormControl<infer U> ?
            U | null :
            NonNullable<C> extends FormArray<infer U> ?
                FormArrayValue<U> :
                C['value']
];

export type FormArrayRawValue<C extends AbstractControl<any>> = [
    NonNullable<C> extends FormGroup<infer U> ?
        FormGroupRawValue<U> :
        NonNullable<C> extends FormControl<infer U> ?
            U | null :
            NonNullable<C> extends FormArray<infer U> ?
                FormArrayRawValue<U> :
                C['setValue'] extends (c: infer U) => void ? U : never
];

export interface FormArrayControlType<C extends AbstractControl<any>> extends AngularAbstractControlOptions {
    validators?: ArrayValidatorFn<C> | ArrayValidatorFn<C>[] | null;
    asyncValidators?: AsyncArrayValidatorFn<C> | AsyncArrayValidatorFn<C>[] | null;
}

export class FormArray<C extends AbstractControl<any>> extends AngularFormArray<C> {

    public constructor(
        controls: C[],
        validatorOrOpts?: ArrayValidatorFn<C> | ArrayValidatorFn<C>[] | FormArrayControlType<C> | null,
        asyncValidator?: AsyncArrayValidatorFn<C> | AsyncArrayValidatorFn<C>[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public get rawValue(): FormArrayRawValue<C> {
        return this.getRawValue() as FormArrayRawValue<C>;
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

    public override addValidators(validators: ArrayValidatorFn<C> | ArrayValidatorFn<C>[]) {
        super.addValidators(validators);
    }

    public override addAsyncValidators(validators: AsyncArrayValidatorFn<C> | AsyncArrayValidatorFn<C>[]) {
        super.addAsyncValidators(validators);
    }

    public override removeValidators(validators: ArrayValidatorFn<C> | ArrayValidatorFn<C>[]) {
        super.removeValidators(validators);
    }

    public override removeAsyncValidators(validators: AsyncArrayValidatorFn<C> | AsyncArrayValidatorFn<C>[]) {
        super.removeAsyncValidators(validators);
    }

    public override hasValidator(validator: ArrayValidatorFn<C>): boolean {
        return super.hasValidator(validator);
    }

    public override hasAsyncValidator(validator: AsyncArrayValidatorFn<C>): boolean {
        return super.hasAsyncValidator(validator);
    }
}
