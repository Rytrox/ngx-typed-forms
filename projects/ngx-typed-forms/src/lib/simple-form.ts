import {Form} from "./form";
import {ValidationErrors, ValidatorFn} from "./validator";
import {computed, Signal, signal, WritableSignal} from "@angular/core";

interface SimpleFormOptions<T> {
    value: T;
    disabled?: boolean;
    validators?: ValidatorFn<T>[];
}

const isSimpleFormOptions = <T> (val: T | SimpleFormOptions<T>): val is SimpleFormOptions<T> => {
    return !!val && typeof val === 'object' &&
        'value' in val &&
        (!('disabled' in val) || typeof val.disabled === 'boolean') &&
        (!('validators' in val) || Array.isArray(val));
}

export function form<T>(val: T | SimpleFormOptions<T>): Form<T> {
    return new SimpleForm<T>(val);
}

class SimpleForm<T> implements Form<T> {

    private readonly _validators: WritableSignal<Set<ValidatorFn<T>>>;

    public readonly value: WritableSignal<T>;
    public readonly disabled: WritableSignal<boolean>;
    public readonly errors: Signal<ValidationErrors | null>;

    public constructor(defaultOrOptions: T | SimpleFormOptions<T>) {
        let disabled: boolean;
        let value: T;
        let validators: ValidatorFn<T>[] = [];

        if (isSimpleFormOptions(defaultOrOptions)) {
            disabled = defaultOrOptions.disabled ?? false;
            value = defaultOrOptions.value;
            validators = defaultOrOptions.validators ?? [];
        } else {
            value = defaultOrOptions;
            disabled = false;
        }

        this._validators = signal(new Set<ValidatorFn<T>>(validators));
        this.disabled = signal(disabled);

        this.value = signal(value);
        this.errors = computed(() => {
            const validators = this._validators();
            const value = this.value();

            const errors = [...validators].map(validator => validator(value))
                .filter((error): error is ValidationErrors => !!error);

            return errors.length > 0 ?
                errors.reduce((error, current) => Object.assign(error, current), {}) :
                null;
        });
    }

    public get validators(): Signal<ValidatorFn<T>[]> {
        return computed(() => [...this._validators()]);
    }

    public addValidators(...validators: ValidatorFn<T>[]): void {
        const set = this._validators();
        validators.forEach(validator => set.add(validator));

        this._validators.set(set);
    }

    public hasValidator(validator: ValidatorFn<T>): boolean {
        const set = this._validators();

        return set.has(validator);
    }

    public removeValidators(...validators: ValidatorFn<T>[]): void {
        const set = this._validators();
        validators.forEach(validator => set.delete(validator));

        this._validators.set(set);
    }
}
