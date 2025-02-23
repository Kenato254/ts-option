import { describe, expect, test } from '@jest/globals';

import { some, none } from '../src/option';

describe('some', () => {
    test('creates Some with number', () => {
        const opt = some(5);
        expect(opt).toEqual({ kind: 'some', value: 5 });
    });

    test('creates Some with string', () => {
        const opt = some("hello");
        expect(opt).toEqual({ kind: 'some', value: "hello" });
    });

    test('creates Some with object', () => {
        const obj = { a: 1 };
        const opt = some(obj);
        expect(opt).toEqual({ kind: 'some', value: obj });
    });

    test('creates Some with null', () => {
        const opt = some(null);
        expect(opt).toEqual({ kind: 'some', value: null });
    });
});

// Tests for none() function
describe('none', () => {
    test('returns None', () => {
        const opt = none();
        expect(opt).toEqual({ kind: 'none' });
    });

    test('returns singleton instance', () => {
        const opt1 = none();
        const opt2 = none();
        expect(opt1).toBe(opt2);
    });
});