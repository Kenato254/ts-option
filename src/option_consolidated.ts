//! Error class `OptionError` for Option-related errors.
/**
 * Custom error class for Option-related errors.
 */
export class OptionError extends Error {
    constructor(message: string = 'Attempted to unwrap a None value') {
        super(message);
        this.name = 'OptionError';
    }
}

//! Option type and functions for working with optional values.
/**
 * Represents a value that may or may not be present.
 */
export type Option<T> = Some<T> | None;

/**
 * Represents a present value of type T.
 */
export interface Some<T> {
    readonly kind: 'some';
    value: T;
}

/**
 * Represents the absence of a value.
 */
export interface None {
    readonly kind: 'none';
}

/**
 * Singleton instance of None.
 */
const NONE: None = { kind: 'none' };

/**
 * Creates an Option containing a value.
 * @template T - The type of the value.
 * @param value - The value to wrap in an Option.
 * @returns An Option containing the value.
 */
export function some<T>(value: T): Some<T> {
    return { kind: 'some', value };
}

/**
 * Creates an Option representing the absence of a value.
 * @returns An Option representing None.
 */
export function none(): None {
    return NONE;
}


//! Guard functions `isSome` and `isNone` for for type checking.
/**
 * Checks if an Option is Some.
 * @template T - The type of the value in the option.
 * @param option - The Option to check.
 * @returns True if the Option is Some, false otherwise.
 */
export function isSome<T>(option: Option<T>): option is Some<T> {
    return option.kind === 'some';
}

/**
 * Checks if an Option is None.
 * @template T - The type of the value in the option.
 * @param option - The Option to check.
 * @returns True if the Option is None, false otherwise.
 */
export function isNone<T>(option: Option<T>): option is None {
    return option.kind === 'none';
}


//! Transformation functions `map`, `flatMap`, and `filter` for value transformations..
/**
 * Transforms the value inside an Option if it is Some, otherwise returns None.
 * @template T - The type of the value in the option.
 * @template U - The type of the transformed value.
 * @param option - The Option to transform.
 * @param fn - The function to apply to the value.
 * @returns A new Option with the transformed value, or None.
 */
export function map<T, U>(option: Option<T>, fn: (value: T) => U): Option<U> {
    return isSome(option) ? some(fn(option.value)) : none();
}

/**
 * Chains operations that return an Option.
 * @template T - The type of the value in the option.
 * @template U - The type of the value in the resulting Option.
 * @param option - The Option to transform.
 * @param fn - The function to apply, returning an Option.
 * @returns The resulting Option from the function, or None.
 */
export function flatMap<T, U>(option: Option<T>, fn: (value: T) => Option<U>): Option<U> {
    return isSome(option) ? fn(option.value) : none();
}

/**
 * Filters an Option based on a predicate.
 * If the option is Some and the predicate returns true for the value, returns the original Some.
 * Otherwise, returns None.
 * @template T - The type of the value in the option.
 * @param option - The Option to filter.
 * @param predicate - The predicate function to test the value.
 * @returns The original Some if the predicate passes, otherwise None.
 */
export function filter<T>(option: Option<T>, predicate: (value: T) => boolean): Option<T> {
    if (isSome(option)) {
        if (predicate(option.value)) {
            return option;
        } else {
            return none();
        }
    } else {
        return none();
    }
}

/**
 * Applies a binary function to two Option values, if both are Some.
 * 
 * @template T - The type of the value contained in the first Option.
 * @template U - The type of the value contained in the second Option.
 * @template V - The type of the value returned by the binary function.
 * 
 * @param {function(T, U): V} fn - The binary function to apply to the values contained in the Options.
 * @param {Option<T>} option1 - The first Option.
 * @param {Option<U>} option2 - The second Option.
 * 
 * @returns {Option<V>} - A new Option containing the result of applying the binary function to the values contained in the Options, or None if either Option is None.
 */
export function liftA2<T, U, V>(fn: (t: T, u: U) => V, option1: Option<T>, option2: Option<U>): Option<V> {
    if (isSome(option1) && isSome(option2)) {
        return some(fn(option1.value, option2.value));
    } else {
        return none();
    }
}

/**
 * Transforms an `Option<T>` to an `Option<U>` by applying the appropriate function
 * based on whether the input option is `Some` or `None`.
 *
 * @template T - The type of the value contained in the input `Option`.
 * @template U - The type of the value contained in the output `Option`.
 * @param {Option<T>} option - The input option to be transformed.
 * @param {(value: T) => Option<U>} onSome - The function to apply if the input option is `Some`.
 * @param {() => Option<U>} onNone - The function to apply if the input option is `None`.
 * @returns {Option<U>} - The transformed option.
 */
export function matchOption<T, U>(option: Option<T>, onSome: (value: T) => Option<U>, onNone: () => Option<U>): Option<U> {
    return isSome(option) ? onSome(option.value) : onNone();
}

/**
 * Combines two `Option` values into a single `Option` containing a tuple of their values.
 * If both options are `Some`, returns `Some` with a tuple of their values.
 * If either option is `None`, returns `None`.
 *
 * @template T - The type of the value contained in the first option.
 * @template U - The type of the value contained in the second option.
 * @param {Option<T>} option1 - The first option to combine.
 * @param {Option<U>} option2 - The second option to combine.
 * @returns {Option<[T, U]>} An option containing a tuple of the values from both options, or `None` if either option is `None`.
 */
export function and<T, U>(option1: Option<T>, option2: Option<U>): Option<[T, U]> {
    if (isSome(option1) && isSome(option2)) {
        return some([option1.value, option2.value]);
    } else {
        return none();
    }
}

/**
 * Returns the first option if it is `Some`, otherwise returns the second option.
 *
 * @template T - The type of the value contained in the options.
 * @param {Option<T>} option1 - The first option to check.
 * @param {Option<T>} option2 - The second option to return if the first is `None`.
 * @returns {Option<T>} - The first option if it is `Some`, otherwise the second option.
 */
export function or<T>(option1: Option<T>, option2: Option<T>): Option<T> {
    return isSome(option1) ? option1 : option2;
}


//! Unwrapping functions `unwrap`, `unwrapOr`, and `unwrapOrElse` for value extraction.
/**
 * Returns the value if the Option is Some, otherwise returns a default value.
 * @template T - The type of the value in the option.
 * @param option - The Option to unwrap.
 * @param defaultValue - The value to return if the Option is None.
 * @returns The value inside Some or the default value.
 */
export function unwrapOr<T>(option: Option<T>, defaultValue: T): T {
    return isSome(option) ? option.value : defaultValue;
}

/**
 * Returns the value if the Option is Some, otherwise throws an OptionError.
 * @template T - The type of the value in the option.
 * @param option - The Option to unwrap.
 * @param message - Optional custom error message.
 * @returns The value inside Some.
 * @throws {OptionError} If the Option is None.
 */
export function unwrap<T>(option: Option<T>, message?: string): T {
    if (isSome(option)) {
        return option.value;
    }
    throw new OptionError(message);
}

/**
 * Returns the option if it is Some, otherwise computes and returns the result of the alternative function.
 * @template T - The type of the value in the option.
 * @param option - The Option to check.
 * @param alternative - A function that returns an alternative Option, called only if the option is None.
 * @returns The original option if it is Some, otherwise the result of alternative().
 */
export function orElse<T>(option: Option<T>, alternative: () => Option<T>): Option<T> {
    return isSome(option) ? option : alternative();
}

//! Conversion functions `from` and `fromNullable` for converting values to Options.
/**
 * Converts a nullable value to an Option.
 * @template T - The type of the value.
 * @param value - The value that may be null or undefined.
 * @returns An Option containing the value if non-null, otherwise None.
 */
export function fromNullable<T>(value: T | null | undefined): Option<T> {
    return value === null || value === undefined ? none() : some(value);
}

