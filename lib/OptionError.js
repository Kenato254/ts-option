"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionError = void 0;
/**
 * Custom error class for Option-related errors.
 */
class OptionError extends Error {
    constructor(message = 'Attempted to unwrap a None value') {
        super(message);
        this.name = 'OptionError';
    }
}
exports.OptionError = OptionError;
