import {Validators} from '@angular/forms';
import {FormControl} from "./form-control";
import {FormGroup} from "./form-group";
import {FormArray} from "./form-array";

interface Foo {
    name: string | null,
    id: number | null,
    date: Date | null,
    bar?: Bar
}

interface Bar {
    parent: string;
}

class BarGroup extends FormGroup<Bar> {

    constructor(original?: Bar) {
        super({
            parent: new FormControl({value: original?.parent ?? '', nonNullable: true}),
        });
    }

}

class FooGroup extends FormGroup<Foo> {

    constructor(original: Foo) {
        super({
            name: new FormControl({value: original.name, validators: [ Validators.required ] }),
            id: new FormControl(original.id),
            date: new FormControl(original.date),
            bar: new BarGroup(original.bar)
        });
    }
}

describe('FormArray', () => {
    it('should create an instance', () => {
        const form = new FormArray<FooGroup>([

        ]);
        expect(form).toBeTruthy();

        // const val = form.value;
        // const rawValue = form.getRawValue();
        //
        // const angularForm = new AngularFormArray<FormControl<string | null>>([]);
        // const angularVal = angularForm.value;
        // const angularRawValue = angularForm.getRawValue();
    });
});
