import {Directive, effect, ElementRef, HostListener, input} from '@angular/core';
import {Form} from "../form";
import {AbstractFormDirective} from "./abstract-form-directive";

@Directive({
    selector: 'input[type=checkbox][form]',
    standalone: false
})
export class InputCheckboxDirective extends AbstractFormDirective<boolean> {

    public readonly form = input.required<Form<boolean>>();

    public constructor(
        private readonly element: ElementRef<HTMLInputElement>
    ) {
        super();

        effect(() => {
            const form = this.form();

            this.element.nativeElement.checked = form.value();
        });
    }

    @HostListener('input')
    public onChange() {
        const form = this.form();

        this.updateValue(form, this.element.nativeElement.checked);
    }
}
