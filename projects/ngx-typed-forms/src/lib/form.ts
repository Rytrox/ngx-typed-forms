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

    readonly errors: ValidationErrors | null;
}
