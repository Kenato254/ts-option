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
  - [Naive Example](#naive-example)

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

## Naive Example

```typescript
import {
  Option,
  some,
  none,
  isSome,
  isNone,
  map,
  flatMap,
  filter,
  unwrap,
  unwrapOr,
  fromNullable,
  and,
  or,
  liftA2,
  matchOption,
  mapWithDefault,
} from 'ts-option';

// In-memory user database
let userID = 0;
const userDB: User[] = [];

type User = {
  id: number;
  name: string;
  email: string;
};

// Create a user with validation
function createUser(name: string, email: string): Option<User> {
  if (name.trim().length < 3 || !email.includes('@')) {
    return none();
  }
  const user = { id: ++userID, name, email };
  userDB.push(user);
  return some(user);
}

// Get user by email
function getUserByEmail(userEmail: string): Option<User> {
  return fromNullable(userDB.find((user) => user.email === userEmail));
}

// Get user by ID
function getUserById(userId: number): Option<User> {
  return fromNullable(userDB.find((user) => user.id === userId));
}

// Update user
function updateUser(user: User): Option<User> {
  const index = userDB.findIndex((u) => u.id === user.id);
  if (index === -1) {
    return none();
  }
  userDB[index] = user;
  return some(user);
}

// Delete user by ID
function deleteUser(userId: number): Option<User> {
  const index = userDB.findIndex((u) => u.id === userId);
  if (index === -1) {
    return none();
  }
  const user = userDB.splice(index, 1)[0];
  return some(user);
}

// Example usage with all Option functionalities
(() => {
  // Create users
  const user1 = createUser('Alice', 'alice@example.com');
  const user2 = createUser('Bob', 'bob@example.com');
  
  const invalidUser = createUser('C', 'charlie');

  // Check if users exist
  console.log('User1 exists:', isSome(user1)); // true
  console.log('Invalid user exists:', isNone(invalidUser)); // true

  // Transform user data with map
  const userName = map(user1, (u) => u.name);
  console.log('User1 name:', unwrapOr(userName, 'Unknown')); // 'Alice'

  // Chain operations with flatMap
  const updatedUser = flatMap(user1, (u) =>
    updateUser({ ...u, name: 'Alicia' })
  );
  console.log('Updated user:', unwrapOr(updatedUser, null)); // { id: 1, name: 'Alicia', email: 'alice@example.com' }

  // Filter users
  const longNameUser = filter(user2, (u) => u.name.length > 3);
  console.log('Long name user:', unwrapOr(longNameUser, null)); // { id: 2, name: 'Bob', email: 'bob@example.com' }

  // Handle non-existent user with unwrap and error
  const nonExistentUser = getUserByEmail('nonexistent@mail.com');
  try {
    unwrap(nonExistentUser);
  } catch (e) {
    console.log('Error:', (e as Error).message); // 'Attempted to unwrap a None value'
  }

  // Provide default with unwrapOr
  const defaultUser = unwrapOr(nonExistentUser, {
    id: ++userID,
    name: 'Guest',
    email: 'guest@example.com',
  });
  console.log('Default user:', defaultUser); // { id: 3, name: 'Guest', email: 'guest@example.com' }

  // Combine two options with and
  const userPair = and(user1, user2);
  console.log('User pair:', unwrapOr(userPair, null)); // [{ id: 1, ... }, { id: 2, ... }]

  // Fallback with or
  const fallbackUser = or(nonExistentUser, some(defaultUser));
  console.log('Fallback user:', unwrapOr(fallbackUser, null)); // { id: 3, name: 'Guest', ... }

  // Combine values with liftA2
  const combinedNames = liftA2(
    (u1: User, u2: User) => `${u1.name} & ${u2.name}`,
    user1,
    user2
  );
  console.log('Combined names:', unwrapOr(combinedNames, 'No pair')); // 'Alicia & Bob'

  // Match cases with matchOption
  const matched = matchOption(
    nonExistentUser,
    (u) => some(`Found: ${u.name}`),
    () => some('No user found')
  );
  console.log('Matched result:', unwrap(matched)); // 'No user found'

  // Map with default value
  const nameWithDefault = mapWithDefault(user1, (u) => u.name.toUpperCase(), 'N/A');
  console.log('Name with default:', unwrap(nameWithDefault)); // 'ALICIA'

  // Delete a user
  const deletedUser = deleteUser(1);
  console.log('Deleted user:', unwrapOr(deletedUser, null)); // { id: 1, name: 'Alicia', ... }

  // Display current database
  console.log('Current DB:', userDB); // [{ id: 2, name: 'Bob', ... }]
})();

```
