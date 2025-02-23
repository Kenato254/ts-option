import { none, Option, some } from './option';

/**
 * Converts a nullable value to an Option.
 * @template T - The type of the value.
 * @param value - The value that may be null or undefined.
 * @returns An Option containing the value if non-null, otherwise None.
 */
export function fromNullable<T>(value: T | null | undefined): Option<T> {
    return value === null || value === undefined ? none() : some(value);
}
