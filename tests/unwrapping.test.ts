import { describe, test, expect } from "@jest/globals";

import { unwrapOr, unwrap, OrElse } from "../src/unwrapping";
import { some, none } from "../src/option";
import { OptionError } from "../src/OptionError";


// Tests for unwrapOr() function
describe('unwrapOr', () => {
    test('returns value for Some', () => {
        const value = unwrapOr(some(5), 0);
        expect(value).toBe(5);
    });

    test('returns default for None', () => {
        const value = unwrapOr(none(), 0);
        expect(value).toBe(0);
    });

    test('returns string for Some', () => {
        const value = unwrapOr(some("hello"), "default");
        expect(value).toBe("hello");
    });

    test('returns default string for None', () => {
        const value = unwrapOr(none(), "default");
        expect(value).toBe("default");
    });
});

// Tests for unwrap() function
describe('unwrap', () => {
    test('returns value for Some', () => {
        const value = unwrap(some(5));
        expect(value).toBe(5);
    });

    test('throws OptionError for None', () => {
        expect(() => unwrap(none())).toThrow(OptionError);
    });

    test('throws OptionError with custom message', () => {
        expect(() => unwrap(none(), "custom message")).toThrow("custom message");
    });

    test('returns null for Some(null)', () => {
        const value = unwrap(some(null));
        expect(value).toBe(null);
    });
});

// Tests for OrElse() function
describe('OrElse', () => {
    test('returns Some when option is Some', () => {
        const opt = OrElse(some(5), () => some(10));
        expect(opt).toEqual(some(5));
    });

    test('returns alternative Some when option is None', () => {
        const opt = OrElse(none(), () => some(10));
        expect(opt).toEqual(some(10));
    });

    test('returns Some when alternative is None', () => {
        const opt = OrElse(some(5), () => none());
        expect(opt).toEqual(some(5));
    });

    test('returns None when both are None', () => {
        const opt = OrElse(none(), () => none());
        expect(opt).toEqual(none());
    });
});