import {Observable} from "rxjs";

export interface ValidationErrors {
    [key: string]: string;
}

export type ValidatorFn<F> = (form: F) => Observable<ValidationErrors | null> | (ValidationErrors | null);

export enum ValidationStatus {
    PENDING,
    VALID,
    INVALID
}
