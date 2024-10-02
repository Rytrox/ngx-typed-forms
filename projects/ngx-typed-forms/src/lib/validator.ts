import {
    ValidationErrors,
    ValidatorFn as AngularValidatorFn,
    AsyncValidatorFn as AngularAsyncValidatorFn
} from '@angular/forms';
import {AbstractControl} from "./abstract-control";
import {Observable} from "rxjs";


export interface ArrayValidatorFn<C extends AbstractControl<any>> extends AngularValidatorFn {
    (control: C): ValidationErrors | null;
}

export interface AsyncArrayValidatorFn<C extends AbstractControl<any>> extends AngularAsyncValidatorFn {
    (control: C): ValidationErrors | null;
}

export interface ValidatorFn<T, R extends T = T> extends AngularValidatorFn {
    (control: AbstractControl<T, R>): ValidationErrors | null;
}

export interface AsyncValidatorFn<T, R extends T = T> extends AngularAsyncValidatorFn {
    (control: AbstractControl<T, R>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
}
