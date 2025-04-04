import {FormGroup} from './form-group';
import {FormControl} from "./form-control";
import {ValidatorFn, Validators} from "@angular/forms";

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

        // const angularGroup = new AngularFormGroup({
        //     name: new FormControl('Test', { validators: [ Validators.required ] }),
        //     id: new FormControl(1),
        //     date: new FormControl(new Date()),
        //     bar: new BarGroup()
        // });
        //
        // const angularRaw = angularGroup.value;

        const rawVal = group.getRawValue();
        expect(group.controls.date.value).toEqual(rawVal.date ?? null);
        expect(group.value.bar).toBeUndefined();
        expect(rawVal.bar).not.toBeUndefined();

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

    it('should register validators', () => {
        const validator: ValidatorFn = (control) => {
            return control.value ? {required: 'Dies ist ein Pflichtfeld'} : null;
        }

        const group = new FooGroup({
            id: 1,
            name: 'Test',
            date: new Date(),
            bar: { parent: 'Hello' }
        });

        group.addValidators(validator);
        expect(group.hasValidator(validator)).toBeTruthy();
    })
});
