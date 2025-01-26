import {Component, effect} from '@angular/core';
import {form} from "../../../ngx-typed-forms/src/lib/simple-form";
import {FormsModule} from "../../../ngx-typed-forms/src/lib/forms.module";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule, MatCheckbox],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    textForm = form('Hello World!');
    numberForm = form(0);
    booleanForm = form(true);
    dateForm = form<Date | null>(new Date());

    title = 'ngx-typed-form-test-project';

    public constructor() {
        effect(() => {
            console.log(this.textForm.value())
        });

        effect(() => {
            console.log(this.numberForm.value())
        });

        effect(() => {
            console.log(this.booleanForm.value())
        });

        effect(() => {
            console.log(this.dateForm.value())
        });
    }
}
