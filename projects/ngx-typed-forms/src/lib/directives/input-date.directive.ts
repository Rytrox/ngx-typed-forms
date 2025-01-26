import {Directive, effect, ElementRef, HostListener, input} from '@angular/core';
import {Form} from "../form";
import {AbstractFormDirective} from "./abstract-form-directive";

@Directive({
    selector: 'input[type=date][form], input[type=datetime-local][form], input[type=time][form]',
    standalone: false
})
export class InputDateDirective extends AbstractFormDirective<Date | null> {

    public readonly form = input.required<Form<Date | null>>();

    public constructor(
        private readonly element: ElementRef<HTMLInputElement>
    ) {
        super();

        effect(() => {
            const form = this.form();

            element.nativeElement.valueAsDate = form.value();
        });
    }

    @HostListener('input')
    protected onInput(): void {
        const form = this.form();

        super.updateValue(form, this.element.nativeElement.valueAsDate);
    }

}
