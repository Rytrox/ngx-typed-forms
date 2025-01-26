import {ValidationErrors, ValidatorFn} from "./validator";
import {Signal, WritableSignal} from "@angular/core";

export interface Form<T> {

    /**
     * The current value of errors.
     * null is considered as VALID!
     */
    readonly errors: Signal<ValidationErrors | null>;

    /**
     * This represents the current value inside the Form.
     * Inside a Form there is a value that can be currently accessed and represents the value while editing
     */
    readonly value: WritableSignal<T>;

    /**
     * Holds all registered validators of the form
     */
    readonly validators: Signal<ValidatorFn<T>[]>;

    /**
     * Adds some validators to this form.
     * You can't add the same validator twice, this will be ignored by its implementation.
     *
     * After adding, the form will be validated again
     *
     * @param validators the validators you want to add
     */
    addValidators(...validators: ValidatorFn<T>[]): void;

    /**
     * Removes some validators from this form.
     * If you try to remove a validator that doesn't exist in this form, it will be ignored
     *
     * After removing, the form will be validated again
     *
     * @param validators the validators you want to remove
     */
    removeValidators(...validators: ValidatorFn<T>[]): void;

    /**
     * Checks if a validator exists inside this form
     *
     * @param validator the validator you want to check
     */
    hasValidator(validator: ValidatorFn<T>): boolean;
}
