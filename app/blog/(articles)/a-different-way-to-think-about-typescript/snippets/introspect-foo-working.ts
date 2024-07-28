// @ts-nocheck
type IntrospectFoo<T> = [T] extends [number | null]
  ? T extends null
    ? "T constructs a set that is a subset of null"
    : "T constructs a set that of number"
  : "T constructs a set that is not a subset of number | null";
type Result = IntrospectFoo<number | string>;
// Result = "T constructs a set that is not a subset of number | null"