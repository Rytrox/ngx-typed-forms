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
|     ^18.2.0     |     ^2.0.0      |


## Usage

### Creating your Interface

Define your Interface like this:

```ts
interface Foo {
    id: number;
    name: string | null;
    date: Date | null
}
```
Only controls that are declared as optional (by using the `?` operator), are allowed to be registered or removed from the form group.

### Initializing your FormGroup-Class
After you've defined your `FormGroup`-interface like above, you can implement a custom `FormGroup` like this:

```ts
import {FormGroup, FormControl} from "@rytrox/ngx-typed-forms";

export class FooGroup extends FormGroup<Foo> {

    public constructor(private input: Foo) {
        super({
            id: new FormControl({value: input.id, nonNullable: true}),
            name: new FormControl(input.name),
            date: new FormControl(input.date),
        });
    }
}
```
Notice that the name of the form-related classes are the same as angular's native ones.

### A new fresh look to FormControls
Over the past years, the famous `FormControl` is pretty stuffed with confusing APIs. 
Angular 18 introduces the `nonNullable`-Flag and deprecated all old constructors as well. 

This Library goes a bit further by removing the old constructors and tidy up the new ones

From:
```ts
// From:
import {FormControl, Validators} from "@angular/forms";

const form = new FormControl('Hello', [Validators.required], [ /* Async-Validators here */]);
```

To:

```ts
import {FormControl} from "@rytrox/ngx-typed-forms";
import {Validators} from "@angular/forms";

const form = new FormControl('Hello', {validators: [Validators.required()], asyncValidators: [ /* Async-Validators here */ ]});
```

### Non-Nullable Angular FormControls
Angular 18 introduces a Non-Nullable flag inside its `options` parameter.
This Library also introduced this feature, but on the `state` parameter instead.

From:
```ts
import {FormControl} from "@angular/forms";

const form = new FormControl('Hello', {nonNullable: true, validators: [], asyncValidators: []});
```

To:

```ts
import {FormControl} from "@rytrox/ngx-typed-forms";

const form = new FormControl({value: 'Hello', nonNullable: true}, {validators: [], asyncValidators: []});
```

### A nice gimmick
You are now able to use the internal Angular-Type `OptionalKeys<T>` that returns all keys, declared as optional (IDK why they hide this, since that's pretty neat in some cases) 

## Differences to Angular:
1. While Angular-Forms are more freely, they often have a lack of type safety. 
   We decided to declare every `AbstractControl` without a generic declaration as `AbstractControl<unknown>` instead of Angular's `AbstractControl<any>`.

2. Angular FormControls should support `undefined`, but changes internally to `null`.
   Since they don't declare this, I fix that inside the type definition

3. Inside Angular, it is allowed to declare a nullable non-nullable FormControl:
   ```ts
   import {FormControl} from "@angular/forms"; 
   const form = new FormControl(null, {nonNullable: true});
   
   const value = form.value; // <- This is null...
   ```
   This happens, because TypeScript constructor declarations are limited.
   But instead of allowing that, we've decided to set this type to `never`:
   ```ts
   import {FormControl} from "@rytrox/ngx-typed-forms"; 
   const form = new FormControl({value: null, nonNullable: true}); // Sadly, I can't catch this...
   
   const value = form.value; // <- This is never!
   ```
4. We introduced in every form a new field called `rawValue`.
   It returns the raw value of every form. 
   It's just an alternative to the `getRawValue()` method.

## Contributing

Please feel free to contribute to this project  
by creating issues or pull requests on our [mirror project](https://github.com/Rytrox/ngx-typed-forms)

## License

Copyright (c) 2024 Team Rytrox  
Licensed under the MIT license  
