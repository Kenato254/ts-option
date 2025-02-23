"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.some = some;
exports.none = none;
/**
 * Singleton instance of None.
 */
const NONE = { kind: 'none' };
/**
 * Creates an Option containing a value.
 * @template T - The type of the value.
 * @param value - The value to wrap in an Option.
 * @returns An Option containing the value.
 */
function some(value) {
    return { kind: 'some', value };
}
/**
 * Creates an Option representing the absence of a value.
 * @returns An Option representing None.
 */
function none() {
    return NONE;
}
