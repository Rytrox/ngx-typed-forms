import {Directive, effect, ElementRef, HostListener, input, Renderer2} from '@angular/core';
import {Form} from "../form";

@Directive({
    selector: 'input[type=text][form], input[type=email][form], input[type=password][form], input[type=search][form], textarea[form]',
    standalone: false
})
export class InputFormDirective {

    public readonly form = input.required<Form<string>>();

    public constructor(
        private readonly element: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
        private readonly renderer: Renderer2
    ) {
        // Update input when form value is updated
        effect(() => {
            const form = this.form();

            element.nativeElement.value = form.value();
        });
    }

    @HostListener('input')
    public onInput(): void {
        this.updateValue();
    }


    protected updateValue(): void {
        const form = this.form();

        form.value.set(this.element.nativeElement.value);
    }

    protected setProperty(key: string, value: unknown): void {
        this.renderer.setProperty(this.element.nativeElement, key, value);
    }
}
