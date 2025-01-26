export interface ValidationErrors {
    [key: string]: string;
}

export type ValidatorFn<V> = (value: V) => (ValidationErrors | null);
