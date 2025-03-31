import {FormControl} from './form-control';
import {Validators, FormControl as AngularFormControl, FormControlDirective, FormsModule} from "@angular/forms";
import {inject, TestBed} from "@angular/core/testing";

describe('FormControl', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            providers: [FormControlDirective]
        })
    })

    it('should create an unknown instance', () => {
        const form = new FormControl();
        expect(form).toBeInstanceOf(FormControl);
        expect(form).toBeInstanceOf(AngularFormControl);

        expect(form.value).toBeFalsy();
        form.setValue('hello');

        // val should be unknown, since we're using no generic constructor
        const val = form.value;
        expect(typeof val).toBe('string');
    });

    it('should create an non-nullable instance', () => {
        const form = new FormControl({ nonNullable: true, value: 'Hello' });

        const value = form.value;
        expect(typeof value).toBe('string');
        expect(form.value).toBe('Hello');

        form.reset();

        expect(typeof form.value).toBe('string');
        expect(form.value).toBe('Hello');
    });

    it('should create an nullable instance', () => {
        const form = new FormControl({ value: 'Hello' });

        const value = form.value;
        expect(typeof value).toBe('string');
        expect(form.value).toBe('Hello');

        form.reset();
        expect(typeof form.value).toBe('object');
        expect(form.value).toBeNull();
    });

    it('should autoconvert undefined to null', () => {
        const form = new FormControl(undefined);
        expect(form.value).toBeNull();
    })

    it('should validate correctly', () => {
        const form = new FormControl<string | null>({value: null, validators: [ Validators.required ] });
        expect(form.value).toBeFalsy();
        expect(form.valid).toBeFalse();

        form.setValue('hello');
        expect(form.value).toBe('hello');
        expect(form.valid).toBeTrue();
    });

    it('should be parsed inside a FormControlDirective', inject([FormControlDirective], (directive: FormControlDirective) => {
        directive.form = new FormControl('Test');

        expect(directive.form).toBeInstanceOf(FormControl);
    }));
});
