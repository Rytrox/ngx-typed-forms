import {Form} from "../form";

export class AbstractFormDirective<T> {

    protected updateValue(form: Form<T>, value: T): void {
        form.value.set(value);
    }
}
