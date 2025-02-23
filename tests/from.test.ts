
import { describe, expect, test } from '@jest/globals';

import { fromNullable, none, some } from '../src';

describe('fromNullable', () => {
    test('returns Some for non-null value', () => {
        const opt = fromNullable(5);
        expect(opt).toEqual(some(5));
    });

    test('returns None for null', () => {
        const opt = fromNullable(null);
        expect(opt).toEqual(none());
    });

    test('returns None for undefined', () => {
        const opt = fromNullable(undefined);
        expect(opt).toEqual(none());
    });

    test('returns Some for string', () => {
        const opt = fromNullable("hello");
        expect(opt).toEqual(some("hello"));
    });

    test('returns Some for 0', () => {
        const opt = fromNullable(0);
        expect(opt).toEqual(some(0));
    });

    test('returns Some for false', () => {
        const opt = fromNullable(false);
        expect(opt).toEqual(some(false));
    });
});