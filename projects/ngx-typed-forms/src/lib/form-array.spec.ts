import {Validators} from '@angular/forms';
import {FormControl} from "./form-control";
import {FormGroup, FormGroupValue} from "./form-group";
import {FormArray} from "./form-array";

interface Foo {
    name: FormControl<string>,
    id: FormControl<number>,
    date: FormControl<Date>,
    bar?: BarGroup
}

interface Bar {
    parent: FormControl<string>;
}

class BarGroup extends FormGroup<Bar> {

    constructor(original?: FormGroupValue<Bar>) {
        super({
            parent: new FormControl(original?.parent)
        });
    }

}

class FooGroup extends FormGroup<Foo> {

    constructor(original: FormGroupValue<Foo>) {
        super({
            name: new FormControl(original.name, { validators: [ Validators.required ] }),
            id: new FormControl(original.id),
            date: new FormControl(original.date),
            bar: new BarGroup(original.bar)
        });
    }
}

describe('FormArray', () => {
    it('should create an instance', () => {
        const form = new FormArray<FooGroup>([]);
        expect(form).toBeTruthy();

        // const val = form.value;
        // const rawValue = form.getRawValue();
        //
        // const angularForm = new AngularFormArray<FormControl<string | null>>([]);
        // const angularVal = angularForm.value;
        // const angularRawValue = angularForm.getRawValue();
    });
});
