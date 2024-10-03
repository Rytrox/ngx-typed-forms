# ngx-typed-forms

Enforces strictly typed forms in Angular.

## Table of Contents
- [Installation](#installation)
- [Compatibility List](#compatibility-list)
- [Usage](#usage)
- [Differences to Angular](#differences-to-angular)
- [Contributing](#contributing)
- [License](#license)

## Installation
Install the library by using npm, pnpm or yarn:

```bash
npm install @rytrox/ngx-typed-forms
```

```bash
pnpm install @rytrox/ngx-typed-forms
```

```bash
yarn add @rytrox/ngx-typed-forms
```

## Compatibility List

| Angular Version | Library Version |
|:---------------:|:---------------:|
|     ^18.2.0     |     ^1.0.0      |


## Usage

### Creating your FormGroup-Interface

Instead of having a `Model`-interface, define a `FormGroup`-interface like this:

```ts
// this interface can now be removed entirely, since it is no longer necessary:
// This is equivalent to "FormGroupRawValue<Foo>"
interface FooModel {
    name: string | null;
    id: number | null;
    date: Date | null
}

// This is our new Interface
interface Foo {
    name: FormControl<string>;
    id: FormControl<number>;
    date: FormControl<Date>;
}
```
Only controls that are declared as optional (by using the `?` operator), are allowed to be registered or removed from the form group.

### Initializing your FormGroup-Class
After you've defined your `FormGroup`-interface like above, you can implement a custom `FormGroup` like this:

```ts
import {FormGroup, FormControl, FormGroupValue} from "@rytrox/ngx-typed-forms";

export class FooGroup extends FormGroup<Foo> {

    public constructor(private input: FormGroupValue<Foo>) {
        super({
            name: new FormControl(input.name),
            id: new FormControl(input.id),
            date: new FormControl(input.date),
        });
    }
}
```
Notice that the name of the form-related classes are the same as angular's native ones.

### Raw Values, Values for FormGroups

There are four new types for `FormGroup` and `FormArrays`: <br>
`FormGroupValue<C>` or `FormArrayValue<C>` and `FormGroupRawValue<C>` or `FormArrayRawValue<C>`.

Those types represent the current value or raw value of your form. 
In most cases your model now is a `FormGroupValue<C>` or `FormGroupRawValue<C>`.

The difference between `FormGroupValue` and `FormGroupRawValue` 
is that `FormGroupValue` hides properties of disabled sub-forms, 
while `FormGroupRawValue` doesn't.

### Strong-typed Validators
Validators inside this Library are now strongly typed by default. 
Every `Form` inside this Library only supports Validators based on their `FormValue`.

For example:

```ts
import {FormControl, AbstractControl} from "@rytrox/ngx-typed-forms";

const form = new FormControl('Hello'); // This is a FormControl<string | null>

// This is not allowed!!
form.addValidators((c: AbstractControll<number | null>) => { 
    ...
});

// Instead, we are using this:
form.addValidators(c => {
    const val = c.value; // type is string | null
})
```

### A nice gimmick
You are now able to use the internal Angular-Type `OptionalKeys<T>` that returns all keys, declared as optional (IDK why they hide this, since that's pretty neat in some cases) 

## Differences to Angular:
1. While Angular-Forms are more freely, they often have a lack of type safety. 
We decided to declare every `AbstractControl` without a generic declaration as `AbstractControl<unknown>` instead of Angular's `AbstractControl<any>`.

2. Since Angular's FormControl strictly enforces `null` inside their control as an empty value, yet requires to explicitly declare it, 
we've decided not to enforce any explicit `null` declaration. 
Our `FormControl<string>` is equivalent to Angular's `FormControl<string | null>`.

## Contributing

Please feel free to contribute to this project  
by creating issues or pull requests on our [mirror project](https://github.com/Rytrox/ngx-typed-forms)

## License

Copyright (c) 2024 Team Rytrox  
Licensed under the MIT license  
