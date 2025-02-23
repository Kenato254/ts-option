/**
 * Represents a value that may or may not be present.
 */
export type Option<T> = Some<T> | None;
/**
 * Represents a present value of type T.
 */
export interface Some<T> {
    readonly kind: 'some';
    value: T;
}
/**
 * Represents the absence of a value.
 */
export interface None {
    readonly kind: 'none';
}
/**
 * Creates an Option containing a value.
 * @template T - The type of the value.
 * @param value - The value to wrap in an Option.
 * @returns An Option containing the value.
 */
export declare function some<T>(value: T): Some<T>;
/**
 * Creates an Option representing the absence of a value.
 * @returns An Option representing None.
 */
export declare function none(): None;
