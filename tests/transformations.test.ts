
import { describe, expect, test } from '@jest/globals';

import { map, flatMap, filter, liftA2, matchOption, and, or } from '../src/transformations';
import { some, none, Option } from '../src/option';


// Tests for map() function
describe('map', () => {
    test('transforms Some value', () => {
        const opt = map(some(5), x => x * 2);
        expect(opt).toEqual(some(10));
    });

    test('returns None for None input', () => {
        const opt = map(none(), (x: number) => x * 2);
        expect(opt).toEqual(none());
    });

    test('transforms Some string to length', () => {
        const opt = map(some("hello"), s => s.length);
        expect(opt).toEqual(some(5));
    });

    test('transforms Some to null', () => {
        const opt = map(some(5), x => null);
        expect(opt).toEqual(some(null));
    });
});

// Tests for flatMap() function
describe('flatMap', () => {
    test('chains Some to Some', () => {
        const opt = flatMap(some(5), x => some(x * 2));
        expect(opt).toEqual(some(10));
    });

    test('chains Some to None', () => {
        const opt = flatMap(some(5), x => none());
        expect(opt).toEqual(none());
    });

    test('returns None for None input', () => {
        const opt = flatMap(none(), (x: number) => some(x * 2));
        expect(opt).toEqual(none());
    });

    test('chains Some string to length', () => {
        const opt = flatMap(some("hello"), s => some(s.length));
        expect(opt).toEqual(some(5));
    });
});

// Tests for filter() function
describe('filter', () => {
    test('keeps Some when predicate passes', () => {
        const opt = filter(some(5), x => x > 0);
        expect(opt).toEqual(some(5));
    });

    test('returns None when predicate fails', () => {
        const opt = filter(some(5), x => x < 0);
        expect(opt).toEqual(none());
    });

    test('returns None for None input', () => {
        const opt = filter(none(), (x: number) => x > 0);
        expect(opt).toEqual(none());
    });

    test('filters Some string by length', () => {
        const opt = filter(some("hello"), s => s.length > 3);
        expect(opt).toEqual(some("hello"));
    });
});

// Tests for liftA2() function
describe('liftA2', () => {
    test('applies function to two Some values', () => {
        const opt = liftA2((a: number, b: number) => a + b, some(3), some(4));
        expect(opt).toEqual(some(7));
    });

    test('returns None when first is None', () => {
        const opt = liftA2((a: number, b: number) => a + b, none(), some(4));
        expect(opt).toEqual(none());
    });

    test('returns None when second is None', () => {
        const opt = liftA2((a: number, b: number) => a + b, some(3), none());
        expect(opt).toEqual(none());
    });

    test('returns None when both are None', () => {
        const opt = liftA2((a: number, b: number) => a + b, none(), none());
        expect(opt).toEqual(none());
    });
});

// Tests for matchOption() function
describe('matchOption', () => {
    test('applies onSome for Some', () => {
        const opt = matchOption(some(5), x => some(x * 2), () => some(0));
        expect(opt).toEqual(some(10));
    });

    test('applies onNone for None', () => {
        const opt = matchOption(none(), (x: number) => some(x * 2), () => some(0));
        expect(opt).toEqual(some(0));
    });

    test('returns None from onSome', () => {
        const opt = matchOption(some(5), x => none(), () => some(0));
        expect(opt).toEqual(none());
    });

    test('returns None from onNone', () => {
        const opt = matchOption(none(), (x: number) => some(x * 2), () => none());
        expect(opt).toEqual(none());
    });
});

// Tests for and() function
describe('and', () => {
    test('combines two Some values', () => {
        const opt = and(some(5), some("hello"));
        expect(opt).toEqual(some([5, "hello"]));
    });

    test('returns None when first is None', () => {
        const opt = and(none(), some("hello"));
        expect(opt).toEqual(none());
    });

    test('returns None when second is None', () => {
        const opt = and(some(5), none());
        expect(opt).toEqual(none());
    });

    test('returns None when both are None', () => {
        const opt = and(none(), none());
        expect(opt).toEqual(none());
    });
});

// Tests for or() function
describe('or', () => {
    test('returns first Some', () => {
        const opt = or(some(5), some(10));
        expect(opt).toEqual(some(5));
    });

    test('returns first Some when second is None', () => {
        const opt = or(some(5), none());
        expect(opt).toEqual(some(5));
    });

    test('returns second Some when first is None', () => {
        const opt = or(none(), some(10));
        expect(opt).toEqual(some(10));
    });

    test('returns None when both are None', () => {
        const opt = or(none(), none());
        expect(opt).toEqual(none());
    });
});
function customExpect(opt: Option<number>) {
    throw new Error('Function not implemented.');
}

