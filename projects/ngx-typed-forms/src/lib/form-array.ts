import {
    FormArray as AngularFormArray,
    AbstractControlOptions, ValidatorFn, AsyncValidatorFn
} from "@angular/forms";
import {AbstractControl} from "./abstract-control";
import {Observable} from "rxjs";

type CFormValue<C extends AbstractControl<any> | undefined> =
    C extends AbstractControl<any, any> ? C['value'][] : never;


type CFormRawValue<C extends AbstractControl<any> | undefined> =
    C extends AbstractControl<any, any> ? C['rawValue'][] : never;

export class FormArray<C extends AbstractControl<any, any>> extends AngularFormArray<C> implements AbstractControl<CFormValue<C>[], CFormRawValue<C>[]> {

    public declare readonly controls: C[];
    public declare readonly value: CFormValue<C>;
    public declare readonly valueChanges: Observable<CFormValue<C>>;

    public constructor(
        controls: C[],
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public get rawValue(): CFormRawValue<C> {
        return this.getRawValue();
    }

    public override setValue(value: CFormRawValue<C>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        super.setValue(value as any, options);
    }

    public override at<K extends keyof C[] & number>(index: K): C {
        return super.at(index) as C;
    }

    public override patchValue(value: CFormValue<C>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        super.patchValue(value, options);
    }

    public override reset(value?: CFormValue<C>, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        super.reset(value ?? undefined, options);
    }

    public override getRawValue(): CFormRawValue<C> {
        return super.getRawValue() as CFormRawValue<C>;
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
}
