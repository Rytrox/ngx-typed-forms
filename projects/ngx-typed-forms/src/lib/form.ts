import {Observable} from "rxjs";
import {ValidationErrors, ValidationStatus, ValidatorFn} from "./validator";

export interface Form<T> {
    /**
     * This represents the current value inside the Form.
     * Inside a Form there is a value that can be currently accessed and represents the value while editing
     */
    value: T;

    /**
     * This represents an observable as value. The value changes after setting a new value
     */
    readonly value$: Observable<T>;

    /**
     * Holds all registered validators of the form
     */
    validators: ValidatorFn<this>[];

    /**
     * Adds some validators to this form.
     * You can't add the same validator twice, this will be ignored by its implementation.
     *
     * After adding, the form will be validated again
     *
     * @param validators the validators you want to add
     */
    addValidators(...validators: ValidatorFn<this>[]): void;

    /**
     * Removes some validators from this form.
     * If you try to remove a validator that doesn't exist in this form, it will be ignored
     *
     * After removing, the form will be validated again
     *
     * @param validators the validators you want to remove
     */
    removeValidators(...validators: ValidatorFn<this>[]): void;

    /**
     * Checks if a validator exists inside this form
     *
     * @param validator the validator you want to check
     */
    hasValidator(validator: ValidatorFn<this>): boolean;

    /**
     * Observable that holds the current status of the form
     */
    readonly status$: Observable<ValidationStatus>;

    /**
     * The current status of the form
     */
    readonly status: ValidationStatus;

    /**
     * if the form is valid
     */
    readonly valid: boolean;

    /**
     * The current value of errors.
     * null is considered as VALID!
     */
    readonly errors: ValidationErrors | null;

    /**
     * An Observable holding the current errors inside this form.
     * null is considered as VALID
     */
    readonly errors$: Observable<ValidationErrors | null>;
}
