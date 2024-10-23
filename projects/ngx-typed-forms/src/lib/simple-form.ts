import {Form} from "./form";
import {ValidationErrors, ValidationStatus, ValidatorFn} from "./validator";
import {BehaviorSubject, forkJoin, isObservable, map, Observable, of, take} from "rxjs";

export class SimpleForm<T> implements Form<T> {

    private readonly _status$ = new BehaviorSubject<ValidationStatus>(ValidationStatus.PENDING);
    private readonly _errors$ = new BehaviorSubject<ValidationErrors | null>(null);
    private readonly _value$: BehaviorSubject<T>;

    private _validators: Set<ValidatorFn<this>>;

    public constructor(defaultValue: T, ...validators: ValidatorFn<SimpleForm<T>>[]) {
        this._validators = new Set<ValidatorFn<this>>(validators ?? []);

        this._value$ = new BehaviorSubject(defaultValue);
        this.performValidation();
    }

    private performValidation(): void {
        this._status$.next(ValidationStatus.PENDING);
        this.createErrorObservable().subscribe(errors => {
            this._errors$.next(errors);

            if (errors) {
                this._status$.next(ValidationStatus.INVALID);
            } else {
                this._status$.next(ValidationStatus.VALID);
            }
        });
    }

    private createErrorObservable(): Observable<ValidationErrors | null> {
        // If no validator, everything is considered as valid
        if (this._validators.size === 0) {
            return of(null);
        }

        return forkJoin(
            [...this._validators].map(validator => {
                const result = validator(this);
                if (isObservable(result)) {
                    // Important! I just need one result, not every result...
                    return result.pipe(take(1));
                }

                return of(result);
            })
        ).pipe(
            map(results => {
                const errors = results.filter(result => !!result);
                if (errors.length > 0) {
                    return errors.reduce((error, current) => Object.assign(error, current), {});
                }

                return null;
            }),
        );
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

    public set value(val: T) {
        this._value$.next(val);
        this.performValidation();
    }

    public get value$(): Observable<T> {
        return this._value$.asObservable();
    }

    public get valid(): boolean {
        return this._status$.value === ValidationStatus.VALID;
    }

    public get validators(): ValidatorFn<this>[] {
        return [...this._validators];
    }

    public set validators(value: ValidatorFn<this>[]) {
        this._validators = new Set(value);
    }

    public addValidators(...validators: ValidatorFn<this>[]): void {
        validators.forEach(validator => this._validators.add(validator));

        this.performValidation();
    }

    public hasValidator(validator: ValidatorFn<this>): boolean {
        return this._validators.has(validator);
    }

    public removeValidators(...validators: ValidatorFn<this>[]): void {
        validators.forEach(validator => this._validators.delete(validator));

        this.performValidation();
    }

    public get errors(): ValidationErrors | null {
        return this._errors$.value;
    }

    public get errors$(): Observable<ValidationErrors | null> {
        return this._errors$.asObservable();
    }
}
