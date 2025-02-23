/**
 * Custom error class for Option-related errors.
 */
export class OptionError extends Error {
    constructor(message: string = 'Attempted to unwrap a None value') {
        super(message);
        this.name = 'OptionError';
    }
}