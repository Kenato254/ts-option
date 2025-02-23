"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSome = isSome;
exports.isNone = isNone;
/**
 * Checks if an Option is Some.
 * @template T - The type of the value in the option.
 * @param option - The Option to check.
 * @returns True if the Option is Some, false otherwise.
 */
function isSome(option) {
    return option.kind === 'some';
}
/**
 * Checks if an Option is None.
 * @template T - The type of the value in the option.
 * @param option - The Option to check.
 * @returns True if the Option is None, false otherwise.
 */
function isNone(option) {
    return option.kind === 'none';
}
