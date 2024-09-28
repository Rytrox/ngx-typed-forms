import {AbstractControlOptions, FormArray as AngularFormArray} from "@angular/forms";
import {AbstractControl} from "./abstract-control";
import {AsyncValidatorFn, ValidatorFn} from "./validator";
import {Observable} from "rxjs";

export class FormArray<T> extends AngularFormArray<AbstractControl<T>> {

    public declare readonly controls: Array<AbstractControl<T>>;
    public declare readonly value: Array<T>;
    public declare readonly valueChanges: Observable<Array<T>>;

    public constructor(
        controls: Array<AbstractControl<T>>,
        validatorOrOpts?: ValidatorFn<Array<T>> | ValidatorFn<Array<T>>[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn<Array<T>> | AsyncValidatorFn<Array<T>>[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public override set validator(validatorFn: ValidatorFn<Array<T>> | null) {
        super.validator = validatorFn;
    }

    public override set asyncValidator(asyncValidatorFn: AsyncValidatorFn<Array<T>> | null) {
        super.asyncValidator = asyncValidatorFn;
    }

    public override setValidators(validators: ValidatorFn<Array<T>> | ValidatorFn<Array<T>>[] | null) {
        super.setValidators(validators);
    }

    public override setAsyncValidators(validators: AsyncValidatorFn<Array<T>> | AsyncValidatorFn<Array<T>>[] | null) {
        super.setAsyncValidators(validators);
    }

    public override addValidators(validators: ValidatorFn<Array<T>> | ValidatorFn<Array<T>>[]) {
        super.addValidators(validators);
    }

    public override addAsyncValidators(validators: AsyncValidatorFn<Array<T>> | AsyncValidatorFn<Array<T>>[]) {
        super.addAsyncValidators(validators);
    }

    public override removeValidators(validators: ValidatorFn<Array<T>> | ValidatorFn<Array<T>>[]) {
        super.removeValidators(validators);
    }

    public override removeAsyncValidators(validators: AsyncValidatorFn<Array<T>> | AsyncValidatorFn<Array<T>>[]) {
        super.removeAsyncValidators(validators);
    }

    public override hasValidator(validator: ValidatorFn<Array<T>>): boolean {
        return super.hasValidator(validator);
    }

    public override hasAsyncValidator(validator: AsyncValidatorFn<T>): boolean {
        return super.hasAsyncValidator(validator);
    }

    public override get(path: number): AbstractControl<T> | null {
        return super.at(path) ?? null;
    }

    // IDK what to say anymore... see Angulars own docs...
    // @ts-ignore
    public override at(index: number): AbstractControl<T> | undefined {
        return super.at(index);
    }

    public override push(control: AbstractControl<T>, options?: { emitEvent?: boolean }) {
        super.push(control, options);
    }

    public override insert(index: number, control: AbstractControl<T>, options?: { emitEvent?: boolean }) {
        super.insert(index, control, options);
    }

    public override setControl(index: number, control: AbstractControl<T>, options?: { emitEvent?: boolean }) {
        super.setControl(index, control, options);
    }

    public override setValue(value: Array<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
        super.setValue(value as Array<any>, options);
    }

    public override patchValue(value: Array<T>, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
        super.patchValue(value, options);
    }

    public override getRawValue(): Array<T> {
        return super.getRawValue();
    }
}
