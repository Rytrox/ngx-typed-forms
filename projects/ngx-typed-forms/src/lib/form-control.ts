import {
    FormControl as AngularFormControl,
    FormControlOptions as AngularFormControlOptions,
    FormControlState as AngularFormControlState
} from "@angular/forms";
import {AbstractControl, AbstractControlOptions} from "./abstract-control";
import {AsyncValidatorFn, ValidatorFn} from "./validator";

export interface FormControlState<T> {
    disabled?: boolean;
    value: T;
}

export interface NonNullableFormControlState<T> {
    disabled?: boolean;
    nonNullable: true;
    value: Defined<T>;
}

type FormControlOptions<T> = AbstractControlOptions<T>;

type Defined<T> = Exclude<T, undefined>;

export interface FormControl<T> extends AbstractControl<T> {

    rawValue: T;

    setValidators(validators: ValidatorFn<T> | ValidatorFn<T>[] | null): void;

    setAsyncValidators(validators: AsyncValidatorFn<T> | AsyncValidatorFn<T>[] | null): void;

    addValidators(...validators: ValidatorFn<T>[]): void;

    addAsyncValidators(...validators: AsyncValidatorFn<T>[]): void;

    removeValidators(...validators: ValidatorFn<T>[]): void;

    removeAsyncValidators(...validators: AsyncValidatorFn<T>[]): void;

    hasValidator(validator: ValidatorFn<T>): boolean;

    hasAsyncValidator(validator: AsyncValidatorFn<T>): boolean;
}

type IFormControl<T> = FormControl<T>;
export const FormControl: FormControlConstructors = class FormControl<T = unknown> extends AngularFormControl implements IFormControl<T> {

    constructor(
        // formState and defaultValue will only be null if T is nullable
        formState: FormControlState<T> | T = null as T,
        opts?: FormControlOptions<T> | null,
    ) {
        super(convertState(formState), convertOpts(formState, opts));
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

const convertOpts = <T> (state: FormControlState<T> | T, options: FormControlOptions<T> | undefined | null): AngularFormControlOptions | undefined | null => {
    // check for non-nullable and move it back
    if (!!state && typeof state === 'object' && 'nonNullable' in state && typeof state.nonNullable === 'boolean') {
        return {
            ...options,
            nonNullable: state.nonNullable
        };
    }

    return options;
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
     *
     * @param options A synchronous validator function, or an array of
     * such functions, or a `FormControlOptions` object that contains validation functions
     * and a validation trigger.
     *
     */
    new <T extends Defined<any> = Defined<unknown>>(
        state: NonNullableFormControlState<T>,
        options?: FormControlOptions<NonNullable<T>>
    ): FormControl<NonNullable<T>>;

    /**
     * Creates a new nullable `FormControl` instance.
     *
     * @param state Initializes the control with an initial value,
     * or an object that defines the initial value and disabled state.
     *
     * @param options A synchronous validator function, or an array of
     * such functions, or a `FormControlOptions` object that contains validation functions
     * and a validation trigger.
     *
     */
    new <T extends Defined<any> = Defined<unknown>>(
        state: FormControlState<T | null> | T | undefined,
        options?: FormControlOptions<Defined<T> | null>
    ): FormControl<Defined<T> | null>;


    /**
     * The presence of an explicit `prototype` property provides backwards-compatibility for apps that
     * manually inspect the prototype chain.
     */
    prototype: FormControl<unknown>;
}
