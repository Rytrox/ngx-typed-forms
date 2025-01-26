import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputFormDirective} from "./directives/input-form.directive";
import {InputNumberDirective} from "./directives/input-number.directive";
import {MatCheckboxDirective} from "./directives/mat-checkbox.directive";
import {InputCheckboxDirective} from "./directives/input-checkbox.directive";
import {InputDateDirective} from "./directives/input-date.directive";


@NgModule({
    declarations: [
        InputFormDirective,
        InputNumberDirective,
        InputCheckboxDirective,
        InputDateDirective,
        MatCheckboxDirective
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        InputFormDirective,
        InputNumberDirective,
        InputCheckboxDirective,
        InputDateDirective,
        MatCheckboxDirective
    ]
})
export class FormsModule {
}
