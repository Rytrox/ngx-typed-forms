import {
    AsyncValidatorFn,
    FormControl as AngularFormControl, FormControlOptions,
    FormControlOptions as AngularFormControlOptions,
    FormControlState as AngularFormControlState, ValidatorFn
} from "@angular/forms";
import {AbstractControl} from "./abstract-control";

export interface FormControlState<T> {
    disabled?: boolean;
    value: T;
    validators?: ValidatorFn[];
    asyncValidators?: AsyncValidatorFn[];
    updateOn?: 'change' | 'blur' | 'submit'
}

export interface NonNullableFormControlState<T> extends FormControlState<T> {
    nonNullable: true;
    value: Defined<T>;
}

type Defined<T> = Exclude<T, undefined>;

export interface FormControl<T> extends AngularFormControl<T>, AbstractControl<T, T> {

    rawValue: T;
    asyncValidator: AsyncValidatorFn | null;
    validator: ValidatorFn | null;

    setValue(value: T, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;

    getRawValue(): T;

    patchValue(value: T, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }): void;

    reset(formState?: T | FormControlState<T>, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;

    setValidators(validators: ValidatorFn | ValidatorFn[] | null): void;

    setAsyncValidators(validators: AsyncValidatorFn | AsyncValidatorFn[] | null): void;

    addValidators(...validators: ValidatorFn[]): void;

    addAsyncValidators(...validators: AsyncValidatorFn[]): void;

    removeValidators(...validators: ValidatorFn[]): void;

    removeAsyncValidators(...validators: AsyncValidatorFn[]): void;

    hasValidator(validator: ValidatorFn): boolean;

    hasAsyncValidator(validator: AsyncValidatorFn): boolean;
}

type IFormControl<T> = FormControl<T>;
export const FormControl: FormControlConstructors = class FormControl<T = unknown> extends AngularFormControl implements IFormControl<T>, AbstractControl<T> {

    constructor(
        // formState and defaultValue will only be null if T is nullable
        formState: FormControlState<T> | NonNullableFormControlState<T> | T = null as T
    ) {
        super(convertState(formState), convertOpts(formState));
    }

    public get rawValue(): T {
        return this.getRawValue();
    }
};

const convertState = <T> (state: FormControlState<T> | T): AngularFormControlState<T> => {
    if (isFormControlState(state)) {
        return {
            value: state.value,
            disabled: !!state.disabled
        };
    }

    return {
        value: state,
        disabled: false
    };
}

const convertOpts = <T> (state: FormControlState<T> | NonNullableFormControlState<T> | T): AngularFormControlOptions | undefined | null => {
    // check for non-nullable and move it back
    if (isFormControlState(state)) {
        if ('nonNullable' in state) {
            return {
                updateOn: state.updateOn,
                validators: state.validators,
                asyncValidators: state.asyncValidators,
                nonNullable: state.nonNullable
            };
        }

        return {
            updateOn: state.updateOn,
            validators: state.validators,
            asyncValidators: state.asyncValidators
        };
    }

    return undefined;
}

const isFormControlState = <T> (val: FormControlState<T> | T): val is FormControlState<T> => {
    return !!val && typeof val === 'object' && 'value' in val &&
        (('disabled' in val && typeof val.disabled === 'boolean') || !('disabled' in val));
}

declare interface FormControlConstructors {
    /**
     * Construct a FormControl with no initial value or validators.
     */
    new (): FormControl<unknown>;


    /**
     * Creates a new non-nullable `FormControl` instance.
     *
     * @param state Initializes the control with an initial value,
     * or an object that defines the initial value and disabled state.
     * This object includes a synchronous validator function, or an array of
     * such functions, or a `FormControlOptions` object that contains validation functions
     * and a validation trigger.
     *
     */
    new <T extends Defined<any> = Defined<unknown>>(
        state: NonNullableFormControlState<T>
    ): FormControl<NonNullable<T>>;

    /**
     * Creates a new nullable `FormControl` instance.
     *
     * @param state Initializes the control with an initial value,
     * or an object that defines the initial value and disabled state.
     * This object includes a synchronous validator function, or an array of
     * such functions, or a `FormControlOptions` object that contains validation functions
     * and a validation trigger.
     *
     */
    new <T extends Defined<any> = Defined<unknown>>(
        state: FormControlState<T | null> | T | undefined,
    ): FormControl<Defined<T> | null>;


    /**
     * The presence of an explicit `prototype` property provides backwards-compatibility for apps that
     * manually inspect the prototype chain.
     */
    prototype: FormControl<unknown>;
}
