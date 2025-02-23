# Option Type in TypeScript

[![CI/CD](https://github.com/kenato254/ts-option/actions/workflows/ci.yml/badge.svg)](https://github.com/kenato254/ts-option/actions/workflows/ci.yml)
[![Coverage](https://codecov.io/gh/kenato254/ts-option/branch/main/graph/badge.svg)](https://codecov.io/gh/kenato254/ts-option)

The `Option` type is a powerful tool for handling values that may or may not be present, inspired by functional programming languages like Rust and Haskell. It provides a type-safe way to avoid common errors associated with `null` or `undefined` by explicitly representing the absence of a value.

## Table of Contents

- [Option Type in TypeScript](#option-type-in-typescript)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Why Use It?](#why-use-it)
  - [Integration Instructions](#integration-instructions)
    - [Example](#example)
    - [Benefits Highlight](#benefits-highlight)
    - [Key Points for the Team](#key-points-for-the-team)
  - [Basic Usage](#basic-usage)
    - [Creating Option](#creating-option)
    - [Checking Option](#checking-option)
    - [Transforming Option](#transforming-option)
    - [Unwrapping Option](#unwrapping-option)
    - [Advanced Usage](#advanced-usage)
      - [Filtering](#filtering)
      - [Fallbacks](#fallbacks)
  - [Benefits](#benefits)
  - [Consolidated](#consolidated)

## Introduction

The `Option<T>` type represents a value that can either be `Some<T>` (containing a value of type `T`) or `None` (representing the absence of a value). This approach helps prevent runtime errors by forcing developers to handle both cases explicitly.

### Why Use It?

- **Type Safety**: Ensures that you handle both `Some` and `None` cases.
- **Error Reduction**: Avoids common bugs related to `null` or `undefined`.
- **Explicit Handling**: Makes the code more readable by clearly indicating where values might be absent.

## Integration Instructions

To integrate the `Option` type into your existing TypeScript project:

1. **Add the `Option` Module**: Copy the `Option` type and its utility functions into a shared module or utility file.
2. **Convert Nullable Values**: Use the `fromNullable` function to convert existing values that might be `null` or `undefined` into `Option<T>`.
3. **Replace Null Checks**: Replace traditional `null` or `undefined` checks with `isSome` and `isNone` functions.

### Example

```typescript
import { Option, some, none, isSome, fromNullable } from './option';

function getSomeValue(): string | null {
  return Math.random() > 0.5 ? 'Hello' : null;
}

const maybeValue: Option<string> = fromNullable(getSomeValue());
if (isSome(maybeValue)) {
  console.log(maybeValue.value);  // Safely access the value
} else {
  console.log('No value present');
}
```

### Benefits Highlight

Improved code safety and readability, reducing the need for defensive null checks.

### Key Points for the Team

- Always handle both `Some` and `None` cases.
- Use utility functions like `map`, `flatMap`, and `unwrapOr` to work with `Option` values.
- Avoid using `unwrap` unless you are certain the value is `Some`, or handle the potential error.

## Basic Usage

### Creating Option

- `some<T>(value: T)`: Creates an Option containing a value.
- `none()`: Creates an Option representing no value.

### Checking Option

- `isSome<T>(option: Option<T>)`: Returns true if the option is Some.
- `isNone<T>(option: Option<T>)`: Returns true if the option is None.

### Transforming Option

- `map<T, U>(option: Option<T>, fn: (value: T) => U)`: Applies a function to the value if Some, otherwise returns None.
- `flatMap<T, U>(option: Option<T>, fn: (value: T) => Option<U>)`: Chains operations that return Option.

### Unwrapping Option

- `unwrapOr<T>(option: Option<T>, defaultValue: T)`: Returns the value if Some, otherwise returns the default.
- `unwrap<T>(option: Option<T>, message?: string)`: Returns the value if Some, otherwise throws an OptionError.

### Advanced Usage

#### Filtering

- `filter<T>(option: Option<T>, predicate: (value: T) => boolean)`: Returns Some if the value passes the predicate, otherwise None.

#### Fallbacks

- `orElse<T>(option: Option<T>, alternative: () => Option<T>)`: Returns the option if Some, otherwise computes and returns the alternative.

## Benefits

1. **Type Safety**: The TypeScript compiler ensures you handle both Some and None, preventing access to absent values.
2. **Error Reduction**: Eliminates runtime errors caused by accessing null or undefined.
3. **Code Clarity**: Makes the intent clear—whether a value is optional—and reduces boilerplate null checks.
4. **Functional Programming**: Encourages functional patterns like mapping and chaining, leading to cleaner, more composable code.

## Consolidated

[option_consolidated.ts](./src/option_consolidated.ts)