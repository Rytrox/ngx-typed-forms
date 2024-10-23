import {Form} from "./form";
import {ValidationStatus, ValidatorFn} from "./validator";
import {BehaviorSubject, isObservable, Observable, of} from "rxjs";

export class SimpleForm<T> implements Form<T> {

    private readonly _status$ = new BehaviorSubject<ValidationStatus>(ValidationStatus.PENDING);
    private readonly _value$: BehaviorSubject<T>;

    private _validators: ValidatorFn<this>[];

    public constructor(defaultValue: T, ...validators: ValidatorFn<SimpleForm<T>>[]) {
        this._value$ = new BehaviorSubject(defaultValue);
        this._validators = validators ?? [];

        if (validators.length > 0) {

            validators.map(validator => validator(this))
                .map(results$ => !isObservable(results$) ? of(results$) : results$)
                ;
        }
    }

    public get status(): ValidationStatus {
        return this._status$.value;
    }

    public get status$(): Observable<ValidationStatus> {
        return this._status$.asObservable();
    }

    public get value(): T {
        return this._value$.value;
    }

    public get value$(): Observable<T> {
        return this._value$.asObservable();
    }

    public get valid(): boolean {
        return this._status$.value === ValidationStatus.VALID;
    }

    public get validators(): ValidatorFn<this>[] {
        return this._validators;
    }

    public set validators(value: ValidatorFn<this>[]) {
        this._validators = value;
    }
}
