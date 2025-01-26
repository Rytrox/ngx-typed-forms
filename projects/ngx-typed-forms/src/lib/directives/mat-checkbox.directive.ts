import {Directive, effect, HostListener, input, Self} from '@angular/core';
import {Form} from "../form";
import {MatCheckbox} from "@angular/material/checkbox";

@Directive({
    selector: 'mat-checkbox[form]',
    standalone: false
})
export class MatCheckboxDirective {

    public readonly form = input.required<Form<boolean>>();

    public constructor(
        @Self() private readonly element: MatCheckbox,
    ) {
        // Update input when form value is updated
        effect(() => {
            const form = this.form();

            element.writeValue(form.value());
        });
    }

    @HostListener('input')
    public onValueChange() {
        const changed = this.element.checked;
        const form = this.form();

        form.value.set(changed);
    }
}
