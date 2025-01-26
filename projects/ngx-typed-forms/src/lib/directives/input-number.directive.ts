import {Directive, effect, ElementRef, HostListener, input, Renderer2} from '@angular/core';
import {Form} from "../form";
import {AbstractFormDirective} from "./abstract-form-directive";

@Directive({
    selector: 'input[type=number][form]',
    standalone: false
})
export class InputNumberDirective extends AbstractFormDirective<number> {

    public readonly form = input.required<Form<number>>();

    public constructor(
        private readonly renderer: Renderer2,
        private readonly element: ElementRef<HTMLInputElement>,
    ) {
        super();

        // Update input when form value is updated
        effect(() => {
            const form = this.form();

            element.nativeElement.valueAsNumber = form.value();
        });
    }

    /**
     * Blocks incoming input that are not numbers
     *
     * @param event
     */
    @HostListener('keydown', ['$event'])
    public onKeyDown(event: KeyboardEvent): void {
        if (event.key.length === 1 && !/[-+.0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }

    @HostListener('input')
    public onInput(): void {
        this.updateValue(this.form(), this.element.nativeElement.valueAsNumber);
    }

}
