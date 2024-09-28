import {FormControl} from './form-control';

describe('FormControl', () => {
    it('should create an unknown instance', () => {
        const form = new FormControl();
        expect(form).toBeInstanceOf(FormControl);

        expect(form.value).toBeFalsy();
        form.setValue('hello');

        // val should be unknown, since we're using no generic constructor
        const val = form.value;
        expect(typeof val).toBe('string');
    });


});
