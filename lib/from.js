"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromNullable = fromNullable;
const option_1 = require("./option");
/**
 * Converts a nullable value to an Option.
 * @template T - The type of the value.
 * @param value - The value that may be null or undefined.
 * @returns An Option containing the value if non-null, otherwise None.
 */
function fromNullable(value) {
    return value === null || value === undefined ? (0, option_1.none)() : (0, option_1.some)(value);
}
