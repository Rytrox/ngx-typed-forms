import {FormGroup, FormGroupValue, OptionalKeys} from './form-group';
import {FormGroup as AngularFormGroup} from '@angular/forms';
import {FormControl} from "./form-control";
import {Validators} from "@angular/forms";

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

describe('JuniorJobFormGroup', () => {

    it('should create an instance', () => {
        expect(new FooGroup({ date: new Date(), name: 'Test', id: 1, bar: { parent: 'Hello' } })).toBeTruthy();
    });

    it('should access values with interface', () => {
        const group = new FooGroup({
            id: 1,
            name: 'Test',
            date: new Date(),
            bar: { parent: 'Hello' }
        });

        group.get('bar')?.disable();

        const angularGroup = new AngularFormGroup({
            name: new FormControl('Test', { validators: [ Validators.required ] }),
            id: new FormControl(1),
            date: new FormControl(new Date()),
            bar: new BarGroup()
        });

        const angularRaw = angularGroup.value;

        const rawVal = group.getRawValue();
        expect(group.controls.date.value).toEqual(rawVal.date ?? null);
        expect(rawVal.bar).toBeUndefined();

        group.setValue(group.getRawValue());
    });

    it('should access controls real types', () => {
        const group = new FooGroup({
            id: 1,
            name: 'Test',
            date: new Date(),
            bar: { parent: 'Hello' }
        });

        const date = group.controls.date.value;
        expect(date).toBeInstanceOf(Date);

        const bar = group.controls.bar?.value;
        expect(bar).toEqual({ parent: 'Hello' });

        const name = group.controls.name.value;
        expect(name).toBe('Test');

        const id = group.controls.id.value;
        expect(id).toBe(1);
    });

    it('should register new controls', () => {
        const group = new FooGroup({
            id: 1,
            name: 'Test',
            date: new Date(),
            bar: { parent: 'Hello' }
        });

        group.registerControl('bar', new BarGroup({parent: 'Hello'}));
    });
});
