// @ts-ignore
type InsideArray<T> = T extends Array<infer R>
  ? R
  : "Invalid type, T is not a subset of Array<any>";

type FooWithoutNull = InsideArray<Array<number>>;

// FooWithoutNull = number
