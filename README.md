# Runtime type validation generator

Generator of validation script of type defined in Flow or TypeScript.

This tool replace [JSON schema](https://json-schema.org/) or [io-ts](https://gcanti.github.io/io-ts/) in user friendly way when you use static typed JavaScript.
You can use just your type definition in Flow or Typescript and generate validation functions.

Ideal for API validation using JSON or CSV.

NOTE: This tool use [babel-plugin-tcomb](https://github.com/gcanti/babel-plugin-tcomb). It contains `older` definition of Flow types. This tool is for `basic` types checking. Not use unnecessarily complex type definition.

## Features

- [x] CLI API to generate Flow typed validation functions
- [ ] CLI API to generate TypeScript typed validation functions
- [ ] WebPack plugin

## Installation

```bash
npm install --save-dev runtime-type-validation-generator
npm install --save tcomb
```

## CLI

```bash
rtvg ./typesDefinitionFile.js ./validationsFile.js
```

or

```bash
npx rtvg ./typesDefinitionFile.js ./validationsFile.js
```

## Example

### Usage

```js
import type { Data } from "./typesDefinitionFile.js";
import { validateData } from "./validationsFile.js";

async function getData(url: string): Data {
    const response = await fetch(url);
    return validateData(await response.json());
}
```

### Types definition file
```js
export type Data = {
    id: string,
    order: number,
    content: Array<Data>,
};
```

### Validations file
```js
export function validateData(data: mixed): Data;
```
