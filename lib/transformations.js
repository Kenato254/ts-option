"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = filter;
exports.map = map;
exports.flatMap = flatMap;
exports.liftA2 = liftA2;
exports.matchOption = matchOption;
exports.and = and;
exports.or = or;
const option_1 = require("./option");
const guards_1 = require("./guards");
/**
 * Filters an Option based on a predicate.
 * If the option is Some and the predicate returns true for the value, returns the original Some.
 * Otherwise, returns None.
 * @template T - The type of the value in the option.
 * @param option - The Option to filter.
 * @param predicate - The predicate function to test the value.
 * @returns The original Some if the predicate passes, otherwise None.
 */
function filter(option, predicate) {
    if ((0, guards_1.isSome)(option)) {
        if (predicate(option.value)) {
            return option;
        }
        else {
            return (0, option_1.none)();
        }
    }
    else {
        return (0, option_1.none)();
    }
}
/**
 * Transforms the value inside an Option if it is Some, otherwise returns None.
 * @template T - The type of the value in the option.
 * @template U - The type of the transformed value.
 * @param option - The Option to transform.
 * @param fn - The function to apply to the value.
 * @returns A new Option with the transformed value, or None.
 */
function map(option, fn) {
    return (0, guards_1.isSome)(option) ? (0, option_1.some)(fn(option.value)) : (0, option_1.none)();
}
/**
 * Chains operations that return an Option.
 * @template T - The type of the value in the option.
 * @template U - The type of the value in the resulting Option.
 * @param option - The Option to transform.
 * @param fn - The function to apply, returning an Option.
 * @returns The resulting Option from the function, or None.
 */
function flatMap(option, fn) {
    return (0, guards_1.isSome)(option) ? fn(option.value) : (0, option_1.none)();
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
function liftA2(fn, option1, option2) {
    if ((0, guards_1.isSome)(option1) && (0, guards_1.isSome)(option2)) {
        return (0, option_1.some)(fn(option1.value, option2.value));
    }
    else {
        return (0, option_1.none)();
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
function matchOption(option, onSome, onNone) {
    return (0, guards_1.isSome)(option) ? onSome(option.value) : onNone();
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
function and(option1, option2) {
    if ((0, guards_1.isSome)(option1) && (0, guards_1.isSome)(option2)) {
        return (0, option_1.some)([option1.value, option2.value]);
    }
    else {
        return (0, option_1.none)();
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
function or(option1, option2) {
    return (0, guards_1.isSome)(option1) ? option1 : option2;
}
