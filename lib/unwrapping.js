"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapOr = unwrapOr;
exports.unwrap = unwrap;
exports.OrElse = OrElse;
const guards_1 = require("./guards");
const OptionError_1 = require("./OptionError");
/**
 * Returns the value if the Option is Some, otherwise returns a default value.
 * @template T - The type of the value in the option.
 * @param option - The Option to unwrap.
 * @param defaultValue - The value to return if the Option is None.
 * @returns The value inside Some or the default value.
 */
function unwrapOr(option, defaultValue) {
    return (0, guards_1.isSome)(option) ? option.value : defaultValue;
}
/**
 * Returns the value if the Option is Some, otherwise throws an OptionError.
 * @template T - The type of the value in the option.
 * @param option - The Option to unwrap.
 * @param message - Optional custom error message.
 * @returns The value inside Some.
 * @throws {OptionError} If the Option is None.
 */
function unwrap(option, message) {
    if ((0, guards_1.isSome)(option)) {
        return option.value;
    }
    throw new OptionError_1.OptionError(message);
}
/**
 * Returns the option if it is Some, otherwise computes and returns the result of the alternative function.
 * @template T - The type of the value in the option.
 * @param option - The Option to check.
 * @param alternative - A function that returns an alternative Option, called only if the option is None.
 * @returns The original option if it is Some, otherwise the result of alternative().
 */
function OrElse(option, alternative) {
    return (0, guards_1.isSome)(option) ? option : alternative();
}
