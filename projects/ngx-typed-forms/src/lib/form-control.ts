import {FormControl as AngularFormControl, FormControlState} from "@angular/forms";
import {AbstractControlOptions} from "./abstract-control";
import {AsyncValidatorFn, ValidatorFn} from "./validator";

interface FormControlOptions<T> extends AbstractControlOptions<T> {
    nonNullable?: true;
}

export class FormControl<T = unknown> extends AngularFormControl<T | null> {

    public constructor(
        value?: FormControlState<T | null> | T | null,
        opts?: FormControlOptions<T | null>
    ) {
        super(value ?? null, opts);
    }

    public get rawValue(): T | null {
        return this.getRawValue();
    }

    public override set validator(validatorFn: ValidatorFn<T | null> | null) {
        super.validator = validatorFn;
    }

    public override set asyncValidator(asyncValidatorFn: AsyncValidatorFn<T | null> | null) {
        super.asyncValidator = asyncValidatorFn;
    }

    public override setValidators(validators: ValidatorFn<T | null> | ValidatorFn<T | null>[] | null) {
        super.setValidators(validators);
    }

    public override setAsyncValidators(validators: AsyncValidatorFn<T | null> | AsyncValidatorFn<T | null>[] | null) {
        super.setAsyncValidators(validators);
    }

    public override addValidators(validators: ValidatorFn<T | null> | ValidatorFn<T | null>[]) {
        super.addValidators(validators);
    }


    public override removeValidators(validators: ValidatorFn<T | null> | ValidatorFn<T | null>[]) {
        super.removeValidators(validators);
    }

    public override removeAsyncValidators(validators: AsyncValidatorFn<T | null> | AsyncValidatorFn<T | null>[]) {
        super.removeAsyncValidators(validators);
    }

    public override hasValidator(validator: ValidatorFn<T | null>): boolean {
        return super.hasValidator(validator);
    }

    public override hasAsyncValidator(validator: AsyncValidatorFn<T | null>): boolean {
        return super.hasAsyncValidator(validator);
    }

    public override registerOnChange(fn: (_: T | null) => void): void {
        super.registerOnChange(fn);
    }
}
