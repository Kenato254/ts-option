import { Option } from './option';
import { isSome } from './guards';
import { OptionError } from './OptionError';


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
export function OrElse<T>(option: Option<T>, alternative: () => Option<T>): Option<T> {
    return isSome(option) ? option : alternative();
}