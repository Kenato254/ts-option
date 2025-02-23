import { describe, test, expect } from '@jest/globals';

import { Option } from '../src/option';
import { isSome, isNone } from '../src/guards';
import { none, some } from '../src/option';

// Tests for isSome() function
describe('isSome', () => {
    test('returns true for Some', () => {
        expect(isSome(some(5))).toBe(true);
    });

    test('returns false for None', () => {
        expect(isSome(none())).toBe(false);
    });

    test('returns true for Some with string', () => {
        expect(isSome(some("test"))).toBe(true);
    });

    test('returns false for None with type', () => {
        expect(isSome({ kind: 'none' } as Option<number>)).toBe(false);
    });
});

// Tests for isNone() function
describe('isNone', () => {
    test('returns true for None', () => {
        expect(isNone(none())).toBe(true);
    });

    test('returns false for Some', () => {
        expect(isNone(some(5))).toBe(false);
    });

    test('returns true for None with type', () => {
        expect(isNone({ kind: 'none' } as Option<number>)).toBe(true);
    });

    test('returns false for Some with string', () => {
        expect(isNone(some("test"))).toBe(false);
    });
});