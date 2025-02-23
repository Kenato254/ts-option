import { Option, Some, None } from './option';

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